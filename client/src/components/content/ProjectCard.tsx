import {
	Badge,
	Em,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
} from '@chakra-ui/react';
import { Blockquote } from '@/components/ui/blockquote';
import { FaNpm } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Project } from '@/data/projects';
import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

interface ProjectCardProps {
	project: any;
	// project: Repo;
	project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description } = project;
	return (
		<Flex
			direction="column"
			w="100%"
			minH="10rem"
			bg="whiteAlpha.400"
			borderRadius="2px"
			py="4"
			px="5"
		>
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					<Image src={logo} alt="project-logo" height="30px" mt="1" />
					<Heading textDecoration="underline dotted #636363" fontSize="30px">
						{name}
					</Heading>
				</Flex>

				<Flex
					direction="column"
					justify="center"
					fontSize="0.6rem"
					m="0"
					fontWeight="light"
					color="gray.600"
					textAlign="right"
				>
					{/* Code component? */}
					<Em>commits: 45</Em>
					<Em>created: Jan. 1</Em>
				</Flex>
			</Flex>
			<HStack>
				<Blockquote fontWeight="500" mt="2">
					{description}
				</Blockquote>
			</HStack>
			<Flex justify="space-between">
				<HStack>
					<Badge variant="outline" colorPalette="yellow">
						Javascript
					</Badge>
					<Badge variant="subtle" colorPalette="yellow">
						Javascript
					</Badge>
					<Badge variant="surface" colorPalette="yellow">
						Javascript
					</Badge>
				</HStack>
				<HStack>
					{links['npm'] && (
						<Icon border="1px solid" fontSize="35px">
							<FaNpm />
						</Icon>
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
				</HStack>
			</Flex>
		</Flex>
	);
}

export default ProjectCard;
