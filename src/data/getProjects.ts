import { Projects, projectLogos, projectTagsConfig, GH_USER_LINK } from "@data/projects";
import registry from "@data/projects.registry.json";
import generated from "@data/projects.generated.json";

type RegistryEntry = {
	name?: string;
	npm?: string | null;
	descriptionFallback?: string | null;
	deploymentFallback?: string | null;
	active: boolean;
};

type GeneratedEntry = {
	name?: string;
	description?: string | null;
	url?: string | null;
	homepageUrl?: string | null;
	createdAt?: string | null;
	pushedAt?: string | null;
	stargazerCount?: number;
	totalCommits?: number;
	topics?: string[];
	languages?: string[];
};

const nonEmpty = (s: string | null | undefined): s is string => typeof s === "string" && s.trim().length > 0;

const sortProjectTags = (tags: string[]) =>
	[...tags].sort(
		(a, b) => (projectTagsConfig[a]?.priority ?? Infinity) - (projectTagsConfig[b]?.priority ?? Infinity),
	);

function buildProjects(): Projects {
	const reg = registry as unknown as Record<string, RegistryEntry>;
	const gen = generated as unknown as Record<string, GeneratedEntry>;
	const out: Projects = {};

	for (const repoName of Object.keys(reg)) {
		const r = reg[repoName];
		if (!r.active) continue;

		const logoConfig = projectLogos[repoName];
		if (!logoConfig) {
			throw new Error(`projects: no logo registered for repo "${repoName}" (add it to projectLogos)`);
		}

		const g = gen[repoName] ?? {};
		out[repoName] = {
			active: r.active,
			logoConfig,
			name: r.name ?? g.name ?? repoName,
			description: nonEmpty(g.description) ? g.description : (r.descriptionFallback ?? null),
			languages: g.languages ?? [],
			tags: sortProjectTags(g.topics ?? []),
			totalCommits: g.totalCommits,
			createdAt: nonEmpty(g.createdAt) ? new Date(g.createdAt) : undefined,
			links: {
				npm: r.npm ?? null,
				repo: g.url ?? GH_USER_LINK,
				deployment: nonEmpty(g.homepageUrl) ? g.homepageUrl : (r.deploymentFallback ?? null),
			},
		};
	}

	return out;
}

const toTs = (d: Date | undefined): number =>
	d instanceof Date && Number.isFinite(d.getTime()) ? d.getTime() : 0;

export const projects: Projects = buildProjects();

export const sortedDesc: string[] = Object.keys(projects).sort(
	(a, b) => toTs(projects[b].createdAt) - toTs(projects[a].createdAt),
);
