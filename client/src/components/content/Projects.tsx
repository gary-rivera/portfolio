import { useState, useEffect } from 'react';
import { useGithubRepos } from '../../hooks/useGitHub';
import { Flex } from '@chakra-ui/react';
import { ProjectCatalog } from '../../data/projects';
import ProjectCard from './ProjectCard';
import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

function Projects() {
	const { repos: fetchedRepos, isLoading, isError } = useGithubRepos();
	const [projectDetails, setProjectDetails] = useState({});

	useEffect(() => {
		if (fetchedRepos) {
			const updatedCatalog = { ...projectDetails };
			fetchedRepos.forEach((repo: Repo) => {
				if (ProjectCatalog[repo.name]) {
					ProjectCatalog[repo.name].description = repo.description || null;
					ProjectCatalog[repo.name].links.repo = repo.html_url || null;
				}
			});
			setProjectDetails(updatedCatalog);
		}
	}, [fetchedRepos]);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;

	return (
		<Flex direction="column" gap="2">
			{Object.keys(ProjectCatalog).map((projectKey: string, idx) => (
				<ProjectCard key={idx} project={ProjectCatalog[projectKey]} />
			))}
		</Flex>
	);
}

export default Projects;

/*
useful keys:

forsure:
- id
- node_id
- name
- description
- url
- created_at
- updated_at
- html_url

maybe:
- branches_url?
- git_tags_url?
- languages_url?
- commits_url?
- git_commits_url?
- homepage?

missing:
- logo
*/
