import {
	Box,
	IconButton,
	Code,
	Heading,
	HStack,
	Icon,
	Image,
	Link,
	Text,
	DataList,
	Stack,
} from '@chakra-ui/react';
import { FaNpm } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

interface ProjectCardProps {
	project: any;
	// project: Repo;
}

function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description } = project;
	return (
		<Box w="100%" minH="10rem" bg="whiteAlpha.500">
			<HStack>
				<Icon fontSize="50px">
					<img src={logo} />
				</Icon>
				<Heading>{name}</Heading>
			</HStack>
			<Text>{description}</Text>
			{links['npm'] && (
				<IconButton variant="ghost">
					<FaNpm />
				</IconButton>
			)}
			{links['deployment'] && (
				<IconButton variant="ghost">
					<FaExternalLinkAlt />
				</IconButton>
			)}
			{links['repo'] && (
				<IconButton variant="ghost">
					<FaGithub />
				</IconButton>
			)}
		</Box>
	);
}

export default ProjectCard;
