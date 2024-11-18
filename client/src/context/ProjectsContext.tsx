import dayjs from "dayjs";
import React, { useContext, useMemo, createContext, useState, useEffect, ReactNode } from "react";
import React, { useContext, useMemo, createContext, useState, useEffect, ReactNode, SetStateAction } from "react";
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
	const { repos, isLoading, isError } = useGitHubReposGQL(projectCatalogKeys);

	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	const [sortedDesc, setSortedDesc] = useState<string[]>([]);
	const [tags, setTags] = useState<SetStateAction<[]>>([]);

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };
			const updatedTags = [];

			for (const [_, value] of Object.entries(repos)) {
				const { url, description, createdAt, name, defaultBranchRef, repositoryTopics } = value;

				updatedProjects[name].links.repo = url;
				updatedProjects[name] = {
					...updatedProjects[name],
					description,
					languages: languages.edges.flatMap((e: GraphQlQueryResponseData) => e?.node?.name.toLowerCase()) || [],
					tags: repositoryTopics?.edges.map((edge: any) => edge.node.topic.name.toLowerCase()) || [],
					totalCommits: defaultBranchRef.target.history.totalCount,
					createdAt,
				};

				updatedTags.push(repositoryTopics?.edges.map((edge: any) => edge.node.topic.name) || []);
			}

			const uniqueTags = [...new Set(updatedTags.flat())];
			setProjects(updatedProjects);
			setTags(uniqueTags);
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
