import React, { ReactNode } from "react";
import { Box, Flex, Heading, Text, Link, SimpleGrid, Spacer, HStack } from "@chakra-ui/react";

type SectionProps = {
	title: string;
	content: string;
};

const Section: React.FC<SectionProps> = ({ title, content }) => (
	<Box>
		<Heading
			as="h2"
			color="#5b3800"
			fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
			fontWeight="800"
			fontSize={{ base: "35px", md: "40px" }}
			letterSpacing="-0.45px"
			mb="5"
		>
			{title}
		</Heading>
		<Text
			color="#281900"
			fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
			fontWeight="500"
			fontSize="18px"
			letterSpacing="normal"
			lineHeight="1.3"
			// textStyle="lg"
		>
			{content}
		</Text>
	</Box>
);

const HighlightGrid = () => (
	<Flex columns={{ base: 1, md: 2 }} mb="18px" border="1px solid white" gap="2">
		{[...Array(2)].map((_, idx) => (
			<Box key={idx} borderRadius="8px" bg="#f6d3c3" w="197px" h="109px" mt={{ base: "13px", md: "0" }} />
		))}
	</Flex>
);

type ExternalLinkProps = {
	href: string;
	children: ReactNode;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
	<Link
		href={href}
		color="#714800"
		fontWeight="600"
		fontSize="20px"
		lineHeight="1"
		fontFamily="Inter, sans-serif"
		textDecoration="none"
		letterSpacing="-0.2px"
		// mb="64px"
		display="inline-block"
	>
		{children}
	</Link>
);

const ExperienceSection = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			w={{ base: "100%", md: "59%" }}
			py={{ base: "40px", md: "79px" }}
			px={{ base: "20px", md: "50px" }}
			// outline="2px solid blue"
			border="2px solid blue"
			// pl="4"
			// bg="red.300"
		>
			<Flex direction="column" gap="55px">
				<Section
					title="Work experience"
					content={`Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur. Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure irure eiusmod exercitation amet ipsum occaecat.`}
				/>
				<Section
					title="Highlights"
					content="Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur. Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure irure eiusmod exercitation amet ipsum occaecat."
				/>
				<Section
					title="Projects"
					content="We’ll do a lot more bullet points and whatnot but that’s a tomorrow project.
Ullamco anim nulla commodo. Irure nostrud ex aliquip. Minim eiusmod nisi sit aliquip cupidatat aliqua pariatur ea ex sint. Duis id ut irure sint consequat deserunt elit labore reprehenderit sit. Ad mollit sunt ut elit ad magna deserunt quis sunt nulla cupidatat quis in in nulla. Consectetur deserunt aliqua nostrud fugiat in dolor id ipsum reprehenderit sint eu culpa pariatur occaecat."
				/>
			</Flex>
			<Spacer mt="2rem" />
			<HighlightGrid />
			<ExternalLink href="https://dinglegary.io">See more on dinglegary.io →</ExternalLink>
			<Spacer mt="2rem" />

			<Section title="Education" content="This can be brief" />
		</Box>
	);
};

export default ExperienceSection;
