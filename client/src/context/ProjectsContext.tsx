import React, {
	useContext,
	useMemo,
	createContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { useGitHubReposGQL } from '@/hooks/useGitHub';
import { ProjectCatalog, projectKeys, Projects } from '@/data/projects';

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
	const { repos, isLoading, isError } = useGitHubReposGQL(projectKeys);

	useEffect(() => {
		if (repos && !isLoading && !isError) {
			const updatedProjects = { ...projects };

			for (const [_, value] of Object.entries(repos)) {
				const { url, description, createdAt, languages, name } = value;

				// process + map data to final projects index
				updatedProjects[name] = {
					...updatedProjects[name],
					links: { repo: url },
					description,
					languages: languages.edges.flatMap((e: any) => e?.node?.name) || [],
					createdAt,
				};
			}

			setProjects(updatedProjects);
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
