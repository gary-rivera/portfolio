import { Project } from "@/data/projects";

// styling
import { Badge, Em, Flex, Heading, HStack, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { Blockquote } from "@/components/ui/blockquote";

// icons
import { FaNpm } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
	project: Project;
}

// TODO: add skeleton component
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
// const { isLoading } = useProjectsContext();
function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description } = project;
	// console.log({ project });
	return (
		<Flex direction="column" w="100%" minH="10rem" bg="whiteAlpha.400" borderRadius="2px" py="4" px="5">
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					<Skeleton loading={!logo?.length}>
						<SkeletonCircle />
						<Image src={logo} alt="project-logo" height="30px" mt="1" />
					</Skeleton>
					<Heading textDecoration={`underline dotted #0891b2`} fontSize="30px">
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
					{/* data.ruio.defaultBranchRef.target.history.totalCount */}
					<Em>created: Jan. 1</Em>
				</Flex>
			</Flex>
			<HStack fontWeight="500" mt="2">
				<Text borderLeft="2px solid" borderColor="cyan.600" pl="0.65rem" ml="3">
					{description}
				</Text>
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
					{links["npm"] && (
						<Icon border="1px solid" fontSize="35px">
							<FaNpm />
						</Icon>
					)}
					{links["deployment"] && (
						<IconButton variant="ghost">
							<FaExternalLinkAlt />
						</IconButton>
					)}
					{links["repo"] && (
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
