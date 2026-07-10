# GitHub-Baked Project Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Source project data from GitHub, fetched at build time and baked into a committed JSON file, so the app renders it synchronously with no runtime token and no runtime API calls.

**Architecture:** A non-fatal Node build script fetches GitHub GraphQL data for a fixed list of repos and writes `src/data/projects.generated.json`. A slim local registry (`projects.registry.json` + a logos map) supplies what GitHub can't (logos, npm links, curation, fallbacks). A merge layer (`getProjects.ts`) combines the two into the existing `Project` shape, GitHub-first with local fallback. The runtime SWR fetch, its hook, and the API service are deleted.

**Tech Stack:** React 18, TypeScript (strict), Vite 5, Tailwind v4, Node 24 (native `fetch`), GitHub GraphQL API.

## Global Constraints

- **Commit authorship:** commits are authored by gary-rivera only. NEVER add a Claude/AI co-author trailer or any AI footer to commit messages.
- **TypeScript strict + `noUnusedLocals` + `noUnusedParameters`:** every removed usage must also remove its now-unused imports, or `tsc -b` fails. There is no lint-only escape.
- **No test framework** is installed (no vitest/jest). Do NOT add one. Verification is done via `npm run build`, `npx tsc -b`, running the fetch script, grepping the `dist/` bundle, and `npm run dev`.
- **Non-fatal build fetch:** the build must succeed even when GitHub is unreachable or the token is unset. A prior build-time GitHub call once "blocked the build" (see `vite.config.ts`) — do not reintroduce that.
- **No `VITE_`-prefixed secret:** the token env var is `GH_API_TOKEN` (no `VITE_` prefix) so it is never bundled into client JS.
- **Node import style:** scripts are ESM `.mjs`; use `node:fs` / `node:path` / `node:url` prefixed imports.
- **Explicit staging only:** the working tree contains UNRELATED uncommitted WIP (UI-aesthetic work: `App.tsx`, `NameNeon*` components, neon CSS, etc.). NEVER run `git add -A`, `git add .`, or `git commit -a`. Stage only the exact files named in each task's commit step. Do not touch, revert, or commit any file not listed for the current task.

---

### Task 1: Build script, registry, and generated JSON

Creates the data pipeline in isolation. The app is NOT rewired yet — it still uses the old runtime path and keeps compiling. Deliverable: `npm run fetch:github` produces a populated, committed `src/data/projects.generated.json`.

**Files:**
- Create: `src/data/projects.registry.json`
- Create: `scripts/fetch-github.mjs`
- Create: `src/data/projects.generated.json` (generated output, committed)
- Create: `.env.example`
- Modify: `.env` (rename `VITE_GH_API_TOKEN` → `GH_API_TOKEN`)
- Modify: `package.json` (add `fetch:github` script)

**Interfaces:**
- Produces: `src/data/projects.registry.json` — a JSON object keyed by GitHub repo name. Each entry: `{ "name"?: string, "npm"?: string | null, "descriptionFallback"?: string | null, "deploymentFallback"?: string | null, "active": boolean }`. Key order defines display registry order.
- Produces: `src/data/projects.generated.json` — a JSON object keyed by repo name. Each entry: `{ "name": string, "description": string | null, "url": string | null, "homepageUrl": string | null, "createdAt": string | null, "pushedAt": string | null, "stargazerCount": number, "totalCommits"?: number, "topics": string[], "languages": string[] }`. May be `{}` if fetch was skipped/failed with no prior cache.
- Produces: `npm run fetch:github` script command.

- [ ] **Step 1: Create the local registry JSON**

Create `src/data/projects.registry.json` with the curated data extracted from the current `src/data/projects.ts` (`name`, npm link, description as fallback, deployment as fallback, active). Repo-name keys match the current `ProjectCatalog` keys, which are the real GitHub repo names.

```json
{
  "ruio": {
    "name": "ruio",
    "npm": "https://www.npmjs.com/package/ruio",
    "descriptionFallback": "runtime ui debugger. draws boxes around your jsx so you stop opening devtools.",
    "deploymentFallback": null,
    "active": true
  },
  "flappy-js": {
    "name": "Snaily JS",
    "npm": null,
    "descriptionFallback": "browser physics game. ts + canvas, ships at 60fps on a chromebook.",
    "deploymentFallback": "https://gary-rivera.github.io/flappy-js/",
    "active": true
  },
  "dead-mart": {
    "name": "DeadMart",
    "npm": null,
    "descriptionFallback": "price tracker for a game economy that doesn't want to be tracked.",
    "deploymentFallback": "https://gary-rivera.github.io/dead-mart",
    "active": true
  },
  "gbot": {
    "name": "G-Bot",
    "npm": null,
    "descriptionFallback": "discord bot. sass, dad jokes, and one cron job for a private server of friends.",
    "deploymentFallback": null,
    "active": true
  },
  "meme-generator": {
    "name": "Meme Genie",
    "npm": null,
    "descriptionFallback": "drag-drop text onto images. the 'i need a meme right now' tool.",
    "deploymentFallback": "https://gary-rivera.github.io/meme-generator/",
    "active": true
  },
  "calculator": {
    "name": "Calculator",
    "npm": null,
    "descriptionFallback": "first project. keyboard arithmetic, long before redux was a thing to argue about.",
    "deploymentFallback": "https://gary-rivera.github.io/calculator/",
    "active": true
  }
}
```

- [ ] **Step 2: Write the build script**

Create `scripts/fetch-github.mjs`. It loads `GH_API_TOKEN` (from `process.env`, falling back to a minimal `.env` parse for local runs), queries GitHub GraphQL for the registry's repo names, and writes `projects.generated.json`. It is non-fatal: on any failure or missing token it reuses the existing file, or writes `{}` if none exists.

```js
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REGISTRY_PATH = resolve(ROOT, "src/data/projects.registry.json");
const OUT_PATH = resolve(ROOT, "src/data/projects.generated.json");
const GH_USERNAME = "gary-rivera";

// Minimal .env loader (no dependency). Only sets vars not already present.
function loadDotEnv() {
  const envPath = resolve(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2].trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}

function keepExistingOrEmpty(reason) {
  if (existsSync(OUT_PATH)) {
    console.warn(`[fetch-github] ${reason} — reusing existing ${OUT_PATH}`);
  } else {
    writeFileSync(OUT_PATH, "{}\n");
    console.warn(`[fetch-github] ${reason} — no cache; wrote empty ${OUT_PATH}`);
  }
}

const sanitizeAlias = (n) => "r_" + n.replace(/[^a-zA-Z0-9_]/g, "_");

async function main() {
  loadDotEnv();
  const token = process.env.GH_API_TOKEN;
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  const repoNames = Object.keys(registry);

  if (!token) return keepExistingOrEmpty("GH_API_TOKEN not set");

  const parts = repoNames
    .map(
      (n) => `
    ${sanitizeAlias(n)}: repository(owner: "${GH_USERNAME}", name: "${n}") {
      name
      description
      url
      homepageUrl
      createdAt
      pushedAt
      stargazerCount
      languages(first: 5) { edges { node { name } } }
      repositoryTopics(first: 8) { edges { node { topic { name } } } }
      defaultBranchRef { target { ... on Commit { history { totalCount } } } }
    }`,
    )
    .join("\n");
  const query = `query { ${parts} }`;

  let json;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return keepExistingOrEmpty(`GitHub GraphQL HTTP ${res.status}`);
    json = await res.json();
  } catch (err) {
    return keepExistingOrEmpty(`fetch failed: ${err?.message ?? err}`);
  }

  if (json.errors?.length) {
    console.warn("[fetch-github] GraphQL errors:", JSON.stringify(json.errors));
  }
  if (!json.data) return keepExistingOrEmpty("GraphQL: no data");

  const out = {};
  for (const n of repoNames) {
    const node = json.data[sanitizeAlias(n)];
    if (!node) continue; // repo missing/renamed — merge falls back to registry
    out[n] = {
      name: node.name ?? n,
      description: node.description ?? null,
      url: node.url ?? null,
      homepageUrl: node.homepageUrl ?? null,
      createdAt: node.createdAt ?? null,
      pushedAt: node.pushedAt ?? null,
      stargazerCount: node.stargazerCount ?? 0,
      totalCommits: node.defaultBranchRef?.target?.history?.totalCount,
      topics: (node.repositoryTopics?.edges ?? []).map((e) => e.node.topic.name),
      languages: (node.languages?.edges ?? []).map((e) => e.node.name),
    };
  }
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`[fetch-github] wrote ${Object.keys(out).length} repos → ${OUT_PATH}`);
}

main().catch((err) => keepExistingOrEmpty(`unexpected: ${err?.message ?? err}`));
```

- [ ] **Step 3: Rename the token env var and add `.env.example`**

Edit `.env`: change the line `VITE_GH_API_TOKEN=<value>` to `GH_API_TOKEN=<value>` (keep the existing token value). Then create `.env.example`:

```
# GitHub token used ONLY at build time by scripts/fetch-github.mjs.
# Scope: read-only public repos (classic PAT `public_repo`, or a fine-grained read-only token).
# Set this in the Vercel/Netlify build environment for production.
GH_API_TOKEN=
```

`.env` is already gitignored (`.gitignore:15`); `.env.example` is committed.

- [ ] **Step 4: Add the `fetch:github` npm script**

Modify `package.json` `scripts` — add the line (leave `build` unchanged for now; it is wired in Task 2):

```json
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"fetch:github": "node scripts/fetch-github.mjs",
		"lint": "eslint .",
		"preview": "vite preview"
	},
```

- [ ] **Step 5: Generate the committed JSON and verify it is populated**

Run: `npm run fetch:github`
Expected (with a valid `GH_API_TOKEN` in `.env`): `[fetch-github] wrote 6 repos → .../src/data/projects.generated.json`

Then confirm the file has real data:
Run: `node -e "const g=require('./src/data/projects.generated.json'); console.log(Object.keys(g), typeof g.ruio.totalCommits)"`
Expected: an array of the 6 repo names and `number`.

If the token is missing/invalid you will instead see a `[fetch-github] ... — no cache; wrote empty` warning and `{}`. Fix the token in `.env` and re-run before committing — the committed artifact should contain real data.

- [ ] **Step 6: Commit**

```bash
git add scripts/fetch-github.mjs src/data/projects.registry.json src/data/projects.generated.json .env.example package.json
git commit -m "build: add GitHub fetch script, registry, and baked project JSON"
```

---

### Task 2: Merge layer and app switch-over

Restructures `projects.ts`, adds the merge layer, rewires the context and container to the baked data, deletes the runtime fetch path, and wires the fetch step into `build`. This is the atomic switch-over: the app compiles and renders from baked JSON at the end.

**Files:**
- Modify: `src/data/projects.ts` (remove `ProjectCatalog`/`projectCatalogKeys`; add `projectLogos`; keep types + `projectTagsConfig` + `GH_USER_LINK`)
- Create: `src/data/getProjects.ts`
- Modify: `src/context/ProjectsContext.tsx` (serve baked data synchronously)
- Modify: `src/components/projects/ProjectsContainer.tsx` (drop loading/error branches)
- Modify: `tsconfig.app.json` (add `resolveJsonModule`)
- Modify: `package.json` (wire fetch into `build`, remove `swr`)
- Delete: `src/services/api.ts`
- Delete: `src/hooks/useGitHub.ts`

**Interfaces:**
- Consumes: `projects.registry.json` and `projects.generated.json` shapes from Task 1.
- Produces: `src/data/projects.ts` exports — `type Project`, `type Projects`, `type BadgeEntry`, `const projectTagsConfig`, `const projectLogos: Record<string, Project["logoConfig"]>`, `const GH_USER_LINK: string`.
- Produces: `src/data/getProjects.ts` exports — `const projects: Projects`, `const sortedDesc: string[]`.
- Produces: `useProjectsContext()` returns `{ projects: Projects; sortedDesc: string[]; isLoading: boolean; isError: boolean }` (loading/error always resolved).

- [ ] **Step 1: Enable `resolveJsonModule` in the app tsconfig**

Modify `tsconfig.app.json` — add inside `compilerOptions` (root `tsconfig.json` already has it; the app project reference does not):

```json
		"resolveJsonModule": true,
```

- [ ] **Step 2: Restructure `src/data/projects.ts`**

Replace the whole file. Keep the asset imports, `GH_USER_LINK`, the `Project`/`Projects` types, `BadgeEntry`/`TagConfig`/`projectTagsConfig`. Replace the `ProjectCatalog` object with a `projectLogos` map keyed by repo name. Remove `projectCatalogKeys`.

```ts
import ruioIcon from "@assets/icons/projects/ruio-active-logo.png";
import deadlockIcon from "@assets/icons/projects/deadlock-logo.png";
import calculatorIcon from "@assets/icons/projects/calculator-logo.png";
import gbotIcon from "@assets/icons/projects/g-bot-icon.png";
import memeGenieLamp from "@assets/icons/projects/meme-genie-logo.svg";
import garyFlappyIcon from "@assets/icons/projects/flappy-js-logo.png";

export const GH_USER_LINK = "https://github.com/gary-rivera";

export type Project = {
	logoConfig: [string, { height: number | string; width: number | string | any[] }];
	name: string;
	links: {
		npm?: string | null;
		repo?: string | null;
		deployment?: string | null;
	};
	description?: string | null;
	languages?: string[];
	tags?: string[];
	createdAt?: Date;
	totalCommits?: number;
	active: boolean;
};

export type Projects = {
	[key: string]: Project;
};

// Logos are local assets and cannot come from GitHub. Keyed by GitHub repo name;
// keys MUST match src/data/projects.registry.json.
export const projectLogos: Record<string, Project["logoConfig"]> = {
	ruio: [ruioIcon, { height: "auto", width: ["2rem", "2.5rem", "3rem"] }],
	"flappy-js": [garyFlappyIcon, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
	"dead-mart": [deadlockIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
	gbot: [gbotIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
	"meme-generator": [memeGenieLamp, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
	calculator: [calculatorIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
};

// [ text, color, icon]
export type BadgeEntry = [string, string, React.ReactNode | null];

type BadgeConfig = [string, string, string | null];
type TagConfig = {
	priority: number;
	badge: BadgeConfig;
};

export const projectTagsConfig: Record<string, TagConfig> = {
	javascript: { priority: 1, badge: ["JavaScript", "yellow", null] },
	typescript: { priority: 1, badge: ["TypeScript", "blue", null] },
	react: { priority: 1, badge: ["React", "blue", null] },
	vite: { priority: 1, badge: ["Vite", "yellow", null] },

	html: { priority: 2, badge: ["HTML", "orange", null] },
	css: { priority: 2, badge: ["CSS", "teal", null] },
	shell: { priority: 2, badge: ["Shell", "gray", null] },
	python: { priority: 2, badge: ["Python", "cyan", null] },
	"developer-tools": { priority: 2, badge: ["Developer Tools", "purple", null] },

	mockup: { priority: 3, badge: ["Mockup", "purple", null] },
	ai: { priority: 3, badge: ["AI", "green", null] },
	gaming: { priority: 3, badge: ["Gaming", "red", null] },

	"first-project": { priority: 4, badge: ["First Project", "gray", null] },
};
```

- [ ] **Step 3: Create the merge layer `src/data/getProjects.ts`**

```ts
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
```

- [ ] **Step 4: Rewire `src/context/ProjectsContext.tsx`**

Replace the whole file. No SWR, no effects — serve the merged data directly.

```tsx
import { createContext, useContext, ReactNode } from "react";
import { Projects } from "@data/projects";
import { projects, sortedDesc } from "@data/getProjects";

type ProjectsContextType = {
	projects: Projects;
	sortedDesc: string[];
	isLoading: boolean;
	isError: boolean;
};

const value: ProjectsContextType = {
	projects,
	sortedDesc,
	isLoading: false,
	isError: false,
};

const ProjectsContext = createContext<ProjectsContextType>(value);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => (
	<ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
);

export const useProjectsContext = () => useContext(ProjectsContext);
```

- [ ] **Step 5: Simplify `src/components/projects/ProjectsContainer.tsx`**

Remove the loading and error branches (data is always resolved). Replace the whole file.

```tsx
import SectionHead from "@components/SectionHead";
import ProjectCard from "./ProjectCard";
import { useProjectsContext } from "@context/ProjectsContext";

export default function ProjectsContainer() {
	const { projects, sortedDesc } = useProjectsContext();

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	return (
		<section aria-labelledby="projects-head">
			<SectionHead name="projects.log" meta={`ls -la · ${visible.length} active`} />
			<div className="flex flex-col gap-2">
				{visible.map((projectKey, idx) => (
					<ProjectCard key={projectKey} project={projects[projectKey]} index={idx} />
				))}
			</div>
		</section>
	);
}
```

- [ ] **Step 6: Delete the runtime fetch path**

```bash
git rm src/services/api.ts src/hooks/useGitHub.ts
```

Confirm nothing else references them:
Run: `grep -rn "useGitHub\|@services/api\|useGitHubReposGQL\|fetchGithubRepositoriesGQL" src`
Expected: no output.

- [ ] **Step 7: Wire the fetch into `build` and remove `swr`**

Modify `package.json`: prepend the fetch step to `build`, and remove the `swr` dependency line.

```json
	"scripts": {
		"dev": "vite",
		"build": "node scripts/fetch-github.mjs && tsc -b && vite build",
		"fetch:github": "node scripts/fetch-github.mjs",
		"lint": "eslint .",
		"preview": "vite preview"
	},
```

Then drop `swr` from the dependency tree:
Run: `npm remove swr`
Expected: `swr` removed from `package.json` `dependencies` and `package-lock.json` updated.

- [ ] **Step 8: Typecheck and build**

Run: `npm run build`
Expected: `[fetch-github] wrote 6 repos → ...` (or a non-fatal reuse warning), then a clean `tsc -b` and a successful `vite build` producing `dist/`. No TypeScript errors about unused imports or missing modules.

- [ ] **Step 9: Verify the rendered data in dev**

Run: `npm run dev` and open the local URL.
Expected: the `projects.log` section shows all 6 projects with commit counts, years, and topic tags sourced from GitHub, and hand-written descriptions where GitHub's are empty. Stop the dev server when confirmed.

- [ ] **Step 10: Commit**

Stage only this task's files (the deletions from Step 6 are already staged by `git rm`; include `projects.generated.json` in case the build in Step 8 refreshed it):

```bash
git add tsconfig.app.json src/data/projects.ts src/data/getProjects.ts \
  src/context/ProjectsContext.tsx src/components/projects/ProjectsContainer.tsx \
  package.json package-lock.json src/data/projects.generated.json
git commit -m "feat: render projects from build-time baked GitHub data"
```

---

### Task 3: Honest build stamp (optional)

Replace the `__REPO_LAST_PUSHED__` build-date placeholder with the real newest `pushedAt` across repos, read from the generated JSON at Vite config time. Skippable; if skipped, StatusConsole keeps showing the build date.

**Files:**
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: `pushedAt` fields from `src/data/projects.generated.json` (Task 1).
- Produces: `__REPO_LAST_PUSHED__` define value = newest repo `pushedAt` (`YYYY-MM-DD`), falling back to today's date.

- [ ] **Step 1: Read newest `pushedAt` in `vite.config.ts`**

Replace the `BUILD_DATE` derivation. Keep the rest of the config identical.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";

// Newest repo pushedAt from the baked GitHub data, shown as "// updated <date>" in
// the status console. Falls back to today's date if the file is missing/empty.
function resolveLastPushed(): string {
	const today = new Date().toISOString().slice(0, 10);
	try {
		const gen = JSON.parse(
			readFileSync(new URL("./src/data/projects.generated.json", import.meta.url), "utf8"),
		) as Record<string, { pushedAt?: string | null }>;
		const dates = Object.values(gen)
			.map((r) => r?.pushedAt)
			.filter((d): d is string => typeof d === "string" && d.length > 0)
			.sort();
		return dates.length ? dates[dates.length - 1].slice(0, 10) : today;
	} catch {
		return today;
	}
}

const BUILD_DATE = resolveLastPushed();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), tailwindcss()],
	define: {
		__REPO_LAST_PUSHED__: JSON.stringify(BUILD_DATE),
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: false,
	},
});
```

- [ ] **Step 2: Build and verify the stamp**

Run: `npm run build`
Expected: clean build. The value baked into `__REPO_LAST_PUSHED__` is the newest repo `pushedAt` (verify by checking the StatusConsole "// updated" line in `npm run dev`, or grep `dist/assets/*.js` for the date string).

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "feat: stamp status console with newest repo pushedAt"
```

---

### Task 4: Production verification

End-to-end proof the production build is secure and resilient. No code changes — verification only, plus a fix loop if anything fails.

**Files:** none (verification).

- [ ] **Step 1: Prove the token is NOT in the client bundle**

Run: `npm run build && grep -rn "GH_API_TOKEN\|ghp_\|github_pat_\|bearer " dist/ || echo "CLEAN: no token/secret in bundle"`
Expected: `CLEAN: no token/secret in bundle`. If the actual token value or a `bearer` auth string appears in `dist/`, stop — something still reads the token at runtime; find and remove it before proceeding.

- [ ] **Step 2: Prove the build is non-fatal without a token**

Run: `GH_API_TOKEN= node scripts/fetch-github.mjs`
Expected: a `[fetch-github] ... not set — reusing existing ...` warning and exit code 0 (the committed JSON is left intact). Confirm the committed data is unchanged:
Run: `git diff --stat src/data/projects.generated.json`
Expected: no output (file unchanged).

- [ ] **Step 3: Prove a simulated fetch failure does not break `build`**

Temporarily confirm resilience by pointing the script at an unreachable host is unnecessary — the empty-token path in Step 2 already exercises the non-fatal branch and `build` runs the same script. Confirm a full build still succeeds with the token unset:
Run: `GH_API_TOKEN= npm run build`
Expected: fetch warns and reuses the committed JSON, then `tsc -b` and `vite build` succeed. `dist/` is produced.

- [ ] **Step 4: Confirm the deploy checklist**

Verify (no command needed — a written confirmation): `GH_API_TOKEN` must be set in the Vercel/Netlify **build** environment (not a `VITE_`-prefixed runtime var). `.env` stays gitignored; `.env.example` documents the var. The committed `projects.generated.json` guarantees a correct render even on the very first deploy before the build script runs.

- [ ] **Step 5: Final commit (if Step 2 or 3 left any changes)**

Only `src/data/projects.generated.json` could have changed (from a build refresh). Check and, if so, commit just that file:

```bash
git diff --stat src/data/projects.generated.json
git add src/data/projects.generated.json
git commit -m "chore: verify baked-data build is secret-free and non-fatal"
```

If `git diff --stat` shows no change, skip this commit entirely.
