import { Project, projectBadgesMap } from "@/data/projects";
import dayjs from "dayjs";
// styling
import {
	chakra,
	Badge,
	Box,
	Em,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Text,
	Spacer,
	Link,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
// icons
import { FaNpm } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
	project: Project;
}

const ProjectIconLink = ({ IconTemplate, iconProps }) => (
	<chakra.a
		// href={url || ""}
		href={""}
		display="flex"
		alignItems="center"
		justifyContent="center"
		borderRadius="md"
		color="blackAlpha.700"
		mb="0.5px"
		h="inherit"
		_hover={{
			// outline="1px solid red"
			// bg="blackAlpha.200"
			// w="2.5rem"
			// bg: "blackAlpha.200",
			color: "blackAlpha.950",
		}}
		{...iconProps}
	>
		{IconTemplate}
	</chakra.a>
);

// TODO: add skeleton component
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
// const { isLoading } = useProjectsContext();
function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description, totalCommits, createdAt, languages } = project;
	console.log(`[ProjectCard] project: ${name} `, { project });

	const GhIcon = chakra(FaGithub);
	const ExternalLinkIcon = chakra(FaExternalLinkAlt);
	const NpmIcon = chakra(FaNpm);
	return (
		<Flex
			direction="column"
			w="50rem"
			h="14rem"
			bg="rgba(0, 0, 0, 0.035)"
			borderRadius="5px"
			py="6"
			px="10"
			fontSize="24px"
		>
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					<Skeleton loading={!logo?.length}>
						<SkeletonCircle />
						<Image src={logo} alt="project-logo" height="2rem" mt="1" />
					</Skeleton>
					<Link
						ml="0.5"
						textDecoration="underline"
						textDecorationStyle="dotted"
						textDecorationThickness="0.16rem"
						textDecorationColor="gray"
						textUnderlineOffset="0.2rem"
						fontSize="1.8rem"
						fontWeight="700"
						letterSpacing="tight"
						_hover={{ textDecorationColor: "#0891b2" }}
						_focus={{
							outline: "none",
							boxShadow: "none",
						}}
						href={links.repo || ""}
						target="_blank"
						rel="noopener noreferrer"
					>
						{name}
					</Link>
				</Flex>

				<Flex
					direction="column"
					justify="start"
					fontSize="0.6rem"
					m="0"
					fontWeight="300"
					color="blackAlpha.600"
					textAlign="right"
				>
					{/* Code component? */}
					{totalCommits && (
						<Em letterSpacing="tight" lineHeight="shorter" fontSize="0.7rem">
							commits: {totalCommits}
						</Em>
					)}
					{/* data.ruio.defaultBranchRef.target.history.totalCount */}
					<Em letterSpacing="tight" lineHeight="shorter" fontSize="0.7rem">
						created: {dayjs(createdAt).format("MMM YYYY")}
					</Em>
				</Flex>
			</Flex>
			<HStack fontWeight="500" mt="2" justifySelf="end" h="auto">
				<Text
					fontSize="1rem"
					borderColor="cyan.600"
					// borderLeft="2px solid"
					// pl="0.65rem"
					// mt="1"
					// ml="3"
				>
					{description}
				</Text>
			</HStack>
			<Spacer />

			<Flex justify="space-between" h="2.3rem">
				<HStack gap="0.25rem">
					{languages?.length &&
						languages?.map((language) => {
							// TODO: fix Unknown to just be language once all badges are in
							const [title, colorScheme, icon] = projectBadgesMap[language] || ["Unknown", "red", null];
							return (
								<Badge key={`badge-${title}`} variant="subtle" colorPalette={colorScheme} opacity="0.6">
									{title || "Unknown"}
									{icon && <Icon></Icon>}
								</Badge>
							);
						})}
				</HStack>
				<HStack
					gap="0.3rem"
					h="inherit"
					// border="1px solid red"
				>
					<ProjectIconLink
						iconProps={{
							mb: "2px",
						}}
						IconTemplate={<ExternalLinkIcon boxSize="0.75rem" />}
					/>
					<ProjectIconLink iconProps={{}} IconTemplate={<NpmIcon boxSize="2rem" />} />
					<ProjectIconLink iconProps={{}} IconTemplate={<GhIcon boxSize="1.5rem" />} />
				</HStack>
			</Flex>
		</Flex>
	);
}

export default ProjectCard;
