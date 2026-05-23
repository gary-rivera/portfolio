import { useContext, useMemo, createContext, useState, useEffect, ReactNode } from "react";
import { useGitHubReposGQL } from "@hooks/useGitHub";
import { ProjectCatalog, projectCatalogKeys, Projects, projectTagsConfig } from "@data/projects";

type ProjectsContextType = {
	projects: Projects;
	sortedDesc: string[];
	isLoading: boolean;
	isError: boolean;
};

const ProjectsContext = createContext<ProjectsContextType>({
	projects: ProjectCatalog,
	sortedDesc: [],
	isLoading: false,
	isError: false,
});

const toTs = (d: Date | string | undefined): number => {
	if (!d) return 0;
	const t = d instanceof Date ? d.getTime() : new Date(d).getTime();
	return Number.isFinite(t) ? t : 0;
};

const sortProjectsByDate = (projects: Projects) => {
	return Object.keys(projects).sort(
		(a, b) => toTs(projects[b].createdAt) - toTs(projects[a].createdAt),
	);
};

const sortProjectTags = (tags: string[]) => {
	return tags.sort((a, b) => {
		const priorityA = projectTagsConfig[a]?.priority || Infinity;
		const priorityB = projectTagsConfig[b]?.priority || Infinity;
		return priorityA - priorityB;
	});
};

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
	const { repos, isLoading, isError } = useGitHubReposGQL(projectCatalogKeys);

	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	const [sortedDesc, setSortedDesc] = useState<string[]>([]);

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };

			for (const [_, value] of Object.entries(repos)) {
				const { url, description, createdAt, name, defaultBranchRef, repositoryTopics } = value;
				const tags = repositoryTopics?.edges.map((edge: any) => edge.node.topic.name) || [];
				const sortedTags = sortProjectTags(tags);
				const existing = updatedProjects[name];
				if (!existing) continue;
				updatedProjects[name] = {
					...existing,
					description: existing.description ?? description,
					links: { ...existing.links, repo: url },
					tags: sortedTags,
					totalCommits: defaultBranchRef?.target?.history?.totalCount,
					createdAt: createdAt ? new Date(createdAt) : existing.createdAt,
				};
			}

			setProjects(updatedProjects);
			setSortedDesc(() => sortProjectsByDate(updatedProjects));
		}
	}, [repos, isLoading, isError]);

	const contextValue = useMemo(
		() => ({ projects, sortedDesc, isLoading, isError }),
		[projects, sortedDesc, isLoading, isError],
	);

	return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => useContext(ProjectsContext);
