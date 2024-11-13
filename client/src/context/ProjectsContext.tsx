import dayjs from "dayjs";
import React, { useContext, useMemo, createContext, useState, useEffect, ReactNode } from "react";
import { useGitHubReposGQL } from "@/hooks/useGitHub";
import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { ProjectCatalog, projectKeys, Projects } from "@/data/projects";

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

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	const [sortedDesc, setSortedDesc] = useState<string[]>([]);
	const { repos, isLoading, isError } = useGitHubReposGQL(projectKeys);

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };

			for (const [_, value] of Object.entries(repos)) {
				const { url, description, createdAt, languages, name, defaultBranchRef } = value;

				updatedProjects[name].links.repo = url;
				updatedProjects[name] = {
					...updatedProjects[name],
					description,
					languages: languages.edges.flatMap((e: GraphQlQueryResponseData) => e?.node?.name.toLowerCase()) || [],
					totalCommits: defaultBranchRef.target.history.totalCount,
					createdAt,
				};
			}

			setProjects(updatedProjects);
			const reposSortedDesc = Object.keys(repos).sort(
				(a, b) => dayjs(repos[b].createdAt).unix() - dayjs(repos[a].createdAt).unix(),
			);
			setSortedDesc(reposSortedDesc);
		}
	}, [repos, isLoading, isError]);

	const contextValue = useMemo(
		() => ({ projects, sortedDesc, isLoading, isError }),
		[projects, sortedDesc, isLoading, isError],
	);

	return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => useContext(ProjectsContext);
