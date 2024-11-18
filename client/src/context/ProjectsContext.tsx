import dayjs from "dayjs";
import React, { useContext, useMemo, createContext, useState, useEffect, ReactNode } from "react";
import { useGitHubReposGQL } from "@/hooks/useGitHub";
import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { ProjectCatalog, projectCatalogKeys, Projects } from "@/data/projects";

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
	const { repos, isLoading, isError } = useGitHubReposGQL(projectCatalogKeys);

	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	const [sortedDesc, setSortedDesc] = useState<string[]>([]);

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };

			for (const [_, value] of Object.entries(repos)) {
				const { url, description, createdAt, name, defaultBranchRef, repositoryTopics } = value;

				updatedProjects[name].links.repo = url;
				updatedProjects[name] = {
					...updatedProjects[name],
					description,
					tags: repositoryTopics?.edges.map((edge: any) => edge.node.topic.name.toLowerCase()) || [],
					totalCommits: defaultBranchRef.target.history.totalCount,
					createdAt,
				};
			}

			setProjects(updatedProjects);

			const projectsSortedDesc = Object.keys(projects).sort(
				(a, b) => dayjs(projects[b].createdAt).unix() - dayjs(projects[a].createdAt).unix(),
			);
			setSortedDesc(projectsSortedDesc);
		}
	}, [repos, isLoading, isError]);

	const contextValue = useMemo(
		() => ({ projects, sortedDesc, isLoading, isError }),
		[projects, sortedDesc, isLoading, isError],
	);

	return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => useContext(ProjectsContext);
