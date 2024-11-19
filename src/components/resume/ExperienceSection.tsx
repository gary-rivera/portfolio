import React, { ReactNode } from "react";
import { Box, Flex, Heading, Text, Link, Spacer, BoxProps } from "@chakra-ui/react";

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
			fontSize={{ base: "35px", md: "1.5em" }}
			letterSpacing="-0.45px"
		>
			{title}
		</Heading>
		<Spacer w="min-content" mb="0.4em" borderRadius="md" />
		<Text
			color="#281900"
			fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
			fontWeight="500"
			fontSize="0.75em"
			letterSpacing="normal"
			lineHeight="1.3"
		>
			{content}
		</Text>
	</Box>
);

const HighlightGrid = () => (
	<Flex columns={{ base: 1, md: 2 }} mb="18px" gap="2">
		{[...Array(2)].map((_, idx) => (
			<Box key={idx} borderRadius="8px" bg="#f6d3c3" w="150px" h="75px" mt={{ base: "13px", md: "0" }} />
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
		fontSize="0.8em"
		lineHeight="1"
		fontFamily="Inter, sans-serif"
		textDecoration="none"
		letterSpacing="-0.2px"
		display="inline-block"
		_hover={{
			textDecoration: "underline",
			textDecorationThickness: "1px",
			textUnderlineOffset: "1px",
			textDecorationColor: "#714800",
		}}
	>
		{children}
	</Link>
);

type ExperienceSectionProps = {
	baseLayout?: BoxProps;
};
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ baseLayout }) => {
	return (
		<Box display="flex" flexDirection="column" {...baseLayout} zIndex="2">
			<Section
				title="Work experience"
				content={`Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur. Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure irure eiusmod exercitation amet ipsum occaecat.`}
			/>
			<Spacer w="min-content" mb="1.3em" borderRadius="md" />

			<Section
				title="Highlights"
				content="Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur. Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure irure eiusmod exercitation amet ipsum occaecat."
			/>
			<Spacer w="min-content" mb="1.3em" borderRadius="md" />

			<Section
				title="Projects"
				content="We’ll do a lot more bullet points and whatnot but that’s a tomorrow project.
Ullamco anim nulla commodo. Irure nostrud ex aliquip. Minim eiusmod nisi sit aliquip cupidatat aliqua pariatur ea ex sint. Duis id ut irure sint consequat deserunt elit labore reprehenderit sit. Ad mollit sunt ut elit ad magna deserunt quis sunt nulla cupidatat quis in in nulla. Consectetur deserunt aliqua nostrud fugiat in dolor id ipsum reprehenderit sint eu culpa pariatur occaecat."
			/>

			<Spacer mt="1.3rem" />
			<HighlightGrid />
			<ExternalLink href="https://dinglegary.io">See more on dinglegary.io →</ExternalLink>
			<Spacer w="min-content" mb="2em" borderRadius="md" />

			<Section title="Education" content="This can be brief" />
		</Box>
	);
};

export default ExperienceSection;
