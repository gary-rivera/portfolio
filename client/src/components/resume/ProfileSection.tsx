import React from "react";
import BgOverlay from "@/assets/resume-bg-overlay.svg?react";
import { Flex, Box, BoxProps, Text, Image, Heading, Spacer, List } from "@chakra-ui/react";

type HeadingProps = {
	children: React.ReactNode;
	as: "h1" | "h2" | "h3";
	fontSize: string | { base: string; md: string };
	mt?: string | number;
	letterSpacing?: string | number;
	fontWeight?: string | number;
	lineHeight?: string | number;
};

const skills = [
	"Bullet points",
	"One after",
	"The other",
	"And whatnot",
	"We'll turn your",
	"Summary text into",
	"Digestible bulletpoints",
];
const primaryTechStack = Array(8).fill("Stack");
const secondaryTechStack = Array(25).fill("Stack");
const contactItems = ["gary@dinglegary.io", "415-654-8327", "Olympia, WA & San Francisco"];

const CustomHeading: React.FC<HeadingProps> = ({
	children,
	as,
	fontSize,

	letterSpacing,
	fontWeight,
	lineHeight,
}) => (
	<Heading
		as={as}
		fontSize={fontSize}
		letterSpacing={letterSpacing}
		fontWeight={fontWeight || "400"}
		lineHeight={lineHeight || "1.2"}
	>
		{children}
	</Heading>
);

type ContactInfoProps = {
	items: string[];
};

const ContactInfo: React.FC<ContactInfoProps> = ({ items }) => (
	<Flex direction="column" gap="0.35em">
		{items.map((item, index) => (
			<Text key={index} fontSize="0.75em" fontWeight="500" color="#789fa1" letterSpacing="0.25px">
				{item}
			</Text>
		))}
	</Flex>
);

type SkillsProps = {
	skills: string[];
};

// TODO: add icon for each skill instead of bullet point-- https://www.chakra-ui.com/docs/components/list
const Skills: React.FC<SkillsProps> = ({ skills }) => (
	<Box color="whiteAlpha.900">
		<CustomHeading as="h3" fontSize="0.75em" fontWeight="800">
			Skills
		</CustomHeading>

		<List.Root gap="4" fontSize="0.75em" mt="0.9em">
			{skills.map((skill, index) => (
				<List.Item key={index} fontWeight="500" lineHeight="0.78em">
					{skill}
				</List.Item>
			))}
		</List.Root>
	</Box>
);

type TechStackProps = {
	primary: string[];
	secondary: string[];
};

const TechStack: React.FC<TechStackProps> = ({ primary, secondary }) => (
	<Box>
		<Flex gap="1" wrap="wrap" justifyContent="space-between" alignItems="start" w="80%">
			{primary.map((item, index) => (
				<Text key={index} color="whiteAlpha.900" fontWeight="800" fontSize="0.75em" letterSpacing="0.19px">
					{item}
				</Text>
			))}
		</Flex>
		<Spacer mb="1.4em" borderRadius="md" />

		<Flex gap="2" wrap="wrap">
			{secondary.map((item, index) => (
				<Text key={index} color="#789fa1" fontSize="0.7em" letterSpacing="0.19px" fontWeight="500">
					{item}
				</Text>
			))}
		</Flex>
	</Box>
);

type ProfileSectionProps = {
	baseLayout?: BoxProps;
};
const ProfileSection: React.FC<ProfileSectionProps> = ({ baseLayout }) => {
	return (
		<Box bg="#031b20" position="relative" {...baseLayout} zIndex="3">
			<Box
				position="absolute"
				top="0"
				left="0"
				w="100%"
				h="100%"
				zIndex="-1"
				maskImage="linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0))"
				// maskRepeat={"no-repeat"}
			>
				<BgOverlay />
			</Box>
			<Box
				// bg="#031b20"
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
				color="whiteAlpha.900"
				fontFamily="Inter, sans-serif"
				fontWeight="500"
				fontSize="16px"
				// position="relative"
				// {...baseLayout}
			>
				{/* <Spacer w="min-content" mb="1em" borderRadius="md" /> */}
				<Image
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/834c2e7d790409beaeef42aad0cf7386ebcd148fcbf1859d4c69ace0ccd5d399?placeholderIfAbsent=true&apiKey=0d9129ea52684a33ba664902d9f1ba79"
					alt="Profile"
					w="70px"
					h="auto"
					objectFit="contain"
				/>
				<Spacer w="min-content" mb="1em" borderRadius="md" />

				<CustomHeading as="h1" fontSize={{ base: "40px", md: "1.65em" }} fontWeight="600" letterSpacing="-1px">
					Gary Rivera
				</CustomHeading>
				<CustomHeading as="h2" fontSize="0.85em" fontWeight="600" lineHeight="1.4">
					Senior Engineer, Designer
				</CustomHeading>

				<Spacer w="2em" my="1.2em" borderRadius="md" borderBottom="1px solid" borderColor="#789fa1" opacity="0.5" />

				<ContactInfo items={contactItems} />

				<Spacer w="min-content" mb="1.4em" borderRadius="md" />

				<Text color="whiteAlpha.900" fontSize="0.75em" letterSpacing="0.2px" lineHeight="1.25em">
					A bio can go here, aka space to craft the most thought-provoking paragraph and self-introduction mankind has
					ever read throughout history, space, and time.
				</Text>

				<Spacer w="min-content" mb="1.4em" borderRadius="md" />

				<Skills skills={skills} />
				<Spacer w="min-content" mb="1.4em" borderRadius="md" />

				<TechStack primary={primaryTechStack} secondary={secondaryTechStack} />
			</Box>
		</Box>
	);
};

export default ProfileSection;
