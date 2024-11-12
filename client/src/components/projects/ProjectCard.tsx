import { Project } from "@/data/projects";
import dayjs from "dayjs";
// styling
import { Badge, Em, Flex, Heading, HStack, Icon, IconButton, Image, Text, Spacer } from "@chakra-ui/react";

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
	const { logo, links, name, description, totalCommits, createdAt, languages } = project;
	console.log(`[ProjectCard] project: ${name} `, { project });
	return (
		<Flex
			direction="column"
			w="50rem"
			h="16rem"
			bg="rgba(0, 0, 0, 0.035)"
			borderRadius="10px"
			pt="10"
			pb="5"
			px="12"
			fontSize="24px"
		>
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					<Skeleton loading={!logo?.length}>
						<SkeletonCircle />
						<Image src={logo} alt="project-logo" height="40px" mt="1" />
					</Skeleton>
					<Heading
						ml="0.5"
						textDecoration={`underline dotted #0891b2`}
						size="3xl"
						fontWeight="700"
						letterSpacing="tight"
					>
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
					{totalCommits && <Em fontSize="0.75rem">commits: {totalCommits}</Em>}
					{/* data.ruio.defaultBranchRef.target.history.totalCount */}
					<Em fontSize="0.75rem">created: {dayjs(createdAt).format("MMM YYYY")}</Em>
				</Flex>
			</Flex>
			<HStack fontWeight="500" mt="2" justifySelf="end" h="auto">
				<Text
					fontSize="1.1rem"
					// borderLeft="2px solid"
					borderColor="cyan.600"
					pl="0.65rem"
					mt="1"
					// ml="3"
				>
					{description}
				</Text>
			</HStack>
			<Spacer />

			<Flex justify="space-between">
				<HStack>
					{languages?.length &&
						languages?.map((l) => (
							<Badge variant="subtle" colorPalette="yellow">
								{l}
							</Badge>
						))}
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
