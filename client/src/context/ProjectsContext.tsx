import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { useGitHubReposGQL } from '@/hooks/useGitHub';
import {
	ProjectCatalog,
	projectRepoKeys as repoKeys,
	Projects,
} from '@/data/projects';

const ProjectsContext = createContext({
	projects: ProjectCatalog,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
	const [projects, setProjects] = useState<Projects>(ProjectCatalog);
	const { repos, isLoading, isError } = useGitHubReposGQL([
		'ruio',
		'calculator',
		'deadlocked',
		'gbot',
		// 'meme-generator',
	]);
	// const { repos, isLoading, isError } = useGitHubReposGQL(repoKeys);

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

			setProjects(updatedProjects);
		}
	}, [repos, isLoading, isError]);

	return (
		<ProjectsContext.Provider value={{ projects }}>
			{children}
		</ProjectsContext.Provider>
	);
};

export const useProjectsContext = () => useContext(ProjectsContext);
