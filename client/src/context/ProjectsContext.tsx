import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useMemo,
	ReactNode,
} from 'react';
import { useGitHubReposGQL } from '@/hooks/useGitHub';
import {
	ProjectCatalog,
	projectRepoKeys as repoKeys,
	Projects,
} from '@/data/projects';

type ProjectsContextType = {
	projects: Projects;
	isLoading: boolean;
	isError: boolean;
};

const ProjectsContext = createContext<ProjectsContextType>({
	projects: ProjectCatalog,
	isLoading: false,
	isError: false,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	console.log('[context] calling swr');
	const { repos, isLoading, isError } = useGitHubReposGQL();

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };
			for (const [key, value] of Object.entries(repos)) {
				const { url, description, createdAt, languages } = value;

				updatedProjects[key] = {
					...updatedProjects[key],
					links: { repo: url },
					description,
					languages: languages.edges.flatMap((e: any) => e?.node?.name) || [],
					createdAt,
				};
			}

			// Only update state if it's actually changed
			if (JSON.stringify(updatedProjects) !== JSON.stringify(projects)) {
				setProjects(updatedProjects);
			}
		}
	}, [repos, isLoading, isError]);

	const contextValue = useMemo(
		() => ({ projects, isLoading, isError }),
		[projects, isLoading, isError]
	);

	return (
		<ProjectsContext.Provider value={contextValue}>
			{children}
		</ProjectsContext.Provider>
	);
};

export const useProjectsContext = () => useContext(ProjectsContext);
