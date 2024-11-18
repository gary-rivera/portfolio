import { Project } from "@/data/projects";
import { getBadgeDetails } from "@/utils/badges";
import dayjs from "dayjs";
import ActionableTextHighlight from "@/components/ui/ActionableTextHighlight";

// styling
import { chakra, Badge, Em, Flex, HStack, Icon, Image, Text, Spacer, Code } from "@chakra-ui/react";

// icons
import { FaNpm } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import LinkIcon from "@/components/ui/chakra-fixes/LinkIconFactory";
interface ProjectCardProps {
	project: Project;
}

const GhIcon = chakra(FaGithub);
const ExternalLinkIcon = chakra(FaExternalLinkAlt);
const NpmIcon = chakra(FaNpm);

const IconMap = {
	repo: GhIcon,
	npm: NpmIcon,
	deployment: ExternalLinkIcon,
};

const iconPropsMap: Record<string, Record<string, any>> = {
	repo: { boxSize: "1.3rem" },
	npm: { boxSize: "2rem", _hover: { color: "#CC3534" } },
	deployment: { boxSize: "0.9rem", ml: "4px" },
};

function ProjectCard({ project }: ProjectCardProps) {
	const { logo, links, name, description, totalCommits, createdAt, tags } = project;
	const iconItems = Object.entries(links)
		.filter(([key, value]) => key in IconMap && value)
		.map(([key, value]) => ({
			IconComponent: IconMap[key],
			href: value,
			props: iconPropsMap[key] || {},
		}));

	return (
		<Flex
			direction="column"
			w={["100%", "100%", "40rem", "45rem"]}
			h={["auto", "12rem", "13rem", "14rem"]}
			bg="var(--primary-bg-color)"
			borderRadius="sm"
			py={["4", "6", "6"]}
			px={["6", "8", "10"]}
			fontSize={["16px", "20px", "22px"]}
		>
			<Flex justify="space-between">
				<Flex align="center" justify="center">
					<Image
						//
						src={logo}
						alt="project-logo"
						// height="2rem"
						h={["1rem", "1rem", "1.45rem"]}
						w="auto"
						mt="1"
						mr="1"
					/>

					<ActionableTextHighlight children={name} externalLink={links.repo} />
				</Flex>

				<Flex direction="column" justify="start" m="0">
					{/* Code component? */}
					{[
						{ title: "commits", value: totalCommits ? totalCommits && totalCommits.toString() : "N/A" },
						{ title: "created", value: dayjs(createdAt).format("MMM YYYY") },
					].map(({ title, value }) => (
						<Code
							variant="none"
							fontWeight="300"
							color="blackAlpha.500"
							textAlign="right"
							letterSpacing="tight"
							py="0"
							my="0"
							key={title}
							minHeight="1"
							fontSize={["0.55rem", "0.6rem", "0.65rem"]}
						>
							{title}: {value}
						</Code>
					))}
				</Flex>
			</Flex>
			<HStack fontWeight="500" mt={[1, 1, 1.5]} justifySelf="end" h="auto">
				<Text
					// fontSize="1rem"
					color="blackAlpha.800"
					fontSize={["0.8rem", "0.85rem", "0.9rem", "1rem"]}
					borderColor="cyan.600"
				>
					{description}
				</Text>
			</HStack>
			<Spacer />

			<Flex justify="space-between" h="2.3rem">
				<HStack gap="0.25rem">
					{tags?.length &&
						tags?.map((tag) => {
							const [title, colorScheme, icon] = getBadgeDetails(tag);
							return (
								<Badge key={`badge-${tag}`} variant="subtle" colorPalette={colorScheme} opacity="0.6">
									{title}
									{icon && <Icon>{icon}</Icon>}
								</Badge>
							);
						})}
				</HStack>
				<HStack gap="0.3rem" h="inherit">
					{iconItems.map(({ IconComponent, href, props }, idx) => (
						<LinkIcon key={`icon-${idx}`} iconProps={{ href }} IconTemplate={<IconComponent {...props} />} />
					))}
				</HStack>
			</Flex>
		</Flex>
	);
}

export default ProjectCard;
