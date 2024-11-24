import dayjs from "dayjs";
import { useContext, useMemo, createContext, useState, useEffect, ReactNode } from "react";
import { useGitHubReposGQL } from "@/hooks/useGitHub";
import { ProjectCatalog, projectCatalogKeys, Projects, projectTagsConfig } from "@/data/projects";

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

const sortProjectsByDate = (projects: Projects) => {
	return Object.keys(projects).sort(
		(a, b) => dayjs(projects[b].createdAt).unix() - dayjs(projects[a].createdAt).unix(),
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
				if (!updatedProjects[name]) continue;
				updatedProjects[name].links.repo = url;
				updatedProjects[name] = {
					...updatedProjects[name],
					description,
					tags: sortedTags,
					totalCommits: defaultBranchRef.target.history.totalCount,
					createdAt,
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
