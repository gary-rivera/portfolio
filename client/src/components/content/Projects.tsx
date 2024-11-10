import { Flex } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';
import { useProjectsContext } from '@/context/ProjectsContext';

import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

function ProjectsContainer() {
	const { projects, isLoading, isError } = useProjectsContext();
	// console.log('[Projects] projects, ', projects);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;

	return (
		<Flex direction="column" gap="2">
			{Object.keys(projects).map((projectKey: string, idx) => {
				if (projects[projectKey].active)
					return <ProjectCard key={idx} project={projects[projectKey]} />;
			})}
		</Flex>
	);
}

export default ProjectsContainer;

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
