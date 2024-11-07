import { useGithubRepos } from '../../hooks/useGitHub';
import { Flex } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';
import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

function Projects() {
	// TODO: start API call while page is loading and when experience tab is rendered
	const { repos, isLoading, isError } = useGithubRepos();
	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;
	console.log({
		repos,
		isLoading,
		isError,
	});

	const renderedProjects = [
		'ruio',
		'gbot',
		'deadlocked',
		'meme-generator',
		'calculator',
		// 'micasa'
	];
	const projects: Repo[] = [];

	for (const repo of repos) {
		if (projects.length === renderedProjects.length) break;
		if (renderedProjects.includes(repo.name)) projects.push(repo);
	}

	return (
		<Flex direction="column" gap="1">
			{projects.length &&
				projects.map((project: Repo) => (
					<ProjectCard key={project.node_id} project={project} />
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

maybe:
- html_url?
- branches_url?
- git_tags_url?
- languages_url?
- commits_url?
- git_commits_url?
- homepage?

missing:
- logo
*/
