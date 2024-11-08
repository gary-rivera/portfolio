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
import { Blockquote } from '@/components/ui/blockquote';
import { FaNpm } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { components } from '@octokit/openapi-types';
type Repo = components['schemas']['repository'];

interface ProjectCardProps {
	project: any;
	// project: Repo;
}

// TODO: spacing/margin/padding
// TODO: bottom HStack as footer (at end of container)
// TODO: badge mapping to color scheme for languages and stack
// TODO: deprecate timeline component?
// TODO: format icon sizing
// TODO: onload, blur -> focus in of header only (handle api calls while this happens)
// TODO: responsive design -> media querying
// TODO: update repo descriptions
// TODO: use array for [icon, relativeDimensionSizing]
// TODO: hover + click effect of project title
// TODO: whiteAlpha vs. blackAlpha
// TODO: skeleton while project/experience values load
// TODO: resume-md repo to have static object values for experience
// TODO: progress/steps UI for experience?

function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description } = project;
	return (
		// <Box w="100%" minH="10rem" bg="blackAlpha.50" borderRadius="2px">
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
