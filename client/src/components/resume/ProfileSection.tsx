import React from "react";
import { Flex, Box, Text, Image, Heading, Spacer, List } from "@chakra-ui/react";

type HeadingProps = {
	children: React.ReactNode;
	as: "h1" | "h2" | "h3";
	fontSize: string | { base: string; md: string };
	mt?: string | number;
	letterSpacing?: string | number;
	fontWeight?: string | number;
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

const CustomHeading: React.FC<HeadingProps> = ({ children, as, fontSize, mt, letterSpacing, fontWeight }) => (
	<Heading as={as} fontSize={fontSize} mt={mt} letterSpacing={letterSpacing} fontWeight={fontWeight || "400"}>
		{children}
	</Heading>
);

type ContactInfoProps = {
	items: string[];
};

const ContactInfo: React.FC<ContactInfoProps> = ({ items }) => (
	<Flex direction="column" gap="10px">
		{items.map((item, index) => (
			<Text key={index} fontSize="20px" fontWeight="500" color="#789fa1" letterSpacing="0.45px">
				{item}
			</Text>
		))}
	</Flex>
);

type SkillsProps = {
	skills: string[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => (
	<Box mt="2rem">
		<CustomHeading as="h3" fontSize="18px" fontWeight="800">
			Skills
		</CustomHeading>

		<List.Root gap="3.5" fontSize="18px" mt="0.6rem">
			{skills.map((skill, index) => (
				<List.Item key={index} fontWeight="600">
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
	<Box mt="2.5rem">
		<Flex gap="2" wrap="wrap" justifyContent="space-between" alignItems="start">
			{primary.map((item, index) => (
				<Text key={index} color="whiteAlpha.800" fontWeight="800" fontSize="20px" letterSpacing="0.19px">
					{item}
				</Text>
			))}
		</Flex>
		<Flex gap="2" wrap="wrap" mt="2.5rem">
			{secondary.map((item, index) => (
				<Text key={index} color="#789fa1" fontSize="18px" letterSpacing="0.19px">
					{item}
				</Text>
			))}
		</Flex>
	</Box>
);

const ProfileSection: React.FC = () => {
	return (
		<Box
			bg="#031b20"
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
			color="whiteAlpha.900"
			h="100%"
			w={{ base: "100%", md: "41%" }}
			px={{ base: "20px", md: "60px" }}
			py={{ base: "40px", md: "70px" }}
			mt={{ base: "40px", md: "0" }}
			fontFamily="Inter, sans-serif"
			fontWeight="500"
			fontSize="22px"
			outline="4px dashed orange"
			border="1px solid red"
		>
			<Image
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/834c2e7d790409beaeef42aad0cf7386ebcd148fcbf1859d4c69ace0ccd5d399?placeholderIfAbsent=true&apiKey=0d9129ea52684a33ba664902d9f1ba79"
				alt="Profile"
				w="120px"
				h="auto"
				objectFit="contain"
			/>
			<CustomHeading as="h1" fontSize={{ base: "40px", md: "42px" }} fontWeight="600" mt="30px" letterSpacing="-1px">
				Gary Rivera
			</CustomHeading>
			<CustomHeading as="h2" fontSize="24px" fontWeight="600" mt="1rem">
				Senior Engineer, Designer
			</CustomHeading>
			<Spacer h="5px" w="60px" my="1.75rem" borderRadius="md" border="1px solid " borderColor="whiteAlpha.400" />
			<ContactInfo items={contactItems} />
			<Text mt="2rem" fontSize="18px" lineHeight="25px" letterSpacing="0.22px">
				A bio can go here, aka space to craft the most thought-provoking paragraph and self-introduction mankind has
				ever read throughout history, space, and time.
			</Text>
			<Skills skills={skills} />
			<TechStack primary={primaryTechStack} secondary={secondaryTechStack} />
		</Box>
	);
};

export default ProfileSection;
