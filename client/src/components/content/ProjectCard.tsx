import {
	Box,
	Code,
	Heading,
	Image,
	Link,
	Text,
	DataList,
	Stack,
} from '@chakra-ui/react';
import { DataListItem } from '@/components/ui/data-list';
import { DataListRoot } from '@/components/ui/data-list';

import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

interface ProjectCardProps {
	project: Repo;
}

function ProjectCard({ project }: ProjectCardProps) {
	console.log(project.name, { project });
	return (
		<DataListRoot
			id={project.id.toString()}
			w="100%"
			minH="10rem"
			bg="whiteAlpha.500"
			orientation="horizontal"
		>
			{/* <DataListItem key="id" label="id" value={project.id} /> */}
			{[
				'id',
				'node_id',
				'name',
				'description',
				'url',
				'created_at',
				'updated_at',
				'html_url',
				'branches_url',
				'git_tags_url',
				'languages_url',
				'commits_url',
				'git_commits_url',
				// 'homepage',
			].map((key) => (
				<DataListItem key={key} label={key} value={project[key]} />
			))}
		</DataListRoot>
	);
}

export default ProjectCard;
