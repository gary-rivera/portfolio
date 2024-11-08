import {
	Badge,
	Box,
	Code,
	Em,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Link,
	Text,
	DataList,
	Stack,
	VStack,
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
		<Box w="100%" minH="10rem" bg="blackAlpha.100" borderRadius="2px">
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					{/* <HStack> */}
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
					<Em>commits</Em>
					<Em>created</Em>
				</Flex>
			</Flex>
			<HStack>
				<Text fontWeight="500">{description}</Text>
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
		</Box>
	);
}

export default ProjectCard;
