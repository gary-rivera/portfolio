import React from "react";
import { Box, Heading, Text, Link, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

const ExperienceSection = () => {
	return (
		<Box display="flex" flexDirection="column" w={{ base: "100%", md: "54%" }} py={{ base: "40px", md: "79px" }}>
			<Heading
				as="h2"
				color="#5b3800"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="800"
				fontSize={{ base: "35px", md: "40px" }}
				letterSpacing="-0.45px"
				mb="29px"
			>
				Work experience
			</Heading>
			<Text
				color="#281900"
				fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="500"
				fontSize="20px"
				lineHeight="30px"
				mb="65px"
			>
				Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa
				aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur.
				Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat
				sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure
				irure eiusmod exercitation amet ipsum occaecat.
			</Text>

			<Heading
				as="h2"
				color="#5b3800"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="800"
				fontSize={{ base: "35px", md: "40px" }}
				letterSpacing="-0.45px"
				mb="29px"
			>
				Highlights
			</Heading>
			<Text
				color="#281900"
				fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="500"
				fontSize="20px"
				lineHeight="30px"
				mb="65px"
			>
				Eu cillum deserunt cupidatat aliquip ipsum cupidatat minim Lorem ipsum cillum ex ea. Ut aliquip non eu culpa
				aute. Duis consequat dolor culpa adipisicing aute minim aliqua esse. Ex ut nostrud do proident tempor excepteur.
				Aliqua et pariatur magna et velit occaecat et nisi eu deserunt excepteur. Sit excepteur do aliquip in occaecat
				sint ut magna tempor esse in officia culpa dolor. Anim consequat cupidatat veniam voluptate veniam culpa irure
				irure eiusmod exercitation amet ipsum occaecat.
			</Text>

			<Heading
				as="h2"
				color="#5b3800"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="800"
				fontSize={{ base: "35px", md: "40px" }}
				letterSpacing="-0.45px"
				mb="29px"
			>
				Projects
			</Heading>
			<Text
				color="#281900"
				fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="500"
				fontSize="20px"
				lineHeight="30px"
				mb="65px"
			>
				We'll do a lot more bullet points and whatnot but that's a tomorrow project.
				<br />
				Ullamco anim nulla commodo. Irure nostrud ex aliquip. Minim eiusmod nisi sit aliquip cupidatat aliqua pariatur
				ea ex sint. Duis id ut irure sint consequat deserunt elit labore reprehenderit sit. Ad mollit sunt ut elit ad
				magna deserunt quis sunt nulla cupidatat quis in in nulla. Consectetur deserunt aliqua nostrud fugiat in dolor
				id ipsum reprehenderit sint eu culpa pariatur occaecat.
			</Text>

			<SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mt="39px" mb="18px" alignItems="center">
				<Box borderRadius="8px" bg="#f6d3c3" w="197px" h="109px" mt={{ base: "13px", md: "0" }} />
				<Box borderRadius="8px" bg="#f6d3c3" w="197px" h="109px" mt={{ base: "13px", md: "0" }} />
			</SimpleGrid>

			<Link
				href="https://dinglegary.io"
				color="#714800"
				fontWeight="600"
				fontSize="20px"
				lineHeight="1"
				fontFamily="Inter, sans-serif"
				textDecoration="none"
				letterSpacing="-0.2px"
				mb="64px"
				display="inline-block"
			>
				See more on dinglegary.io →
			</Link>

			<Heading
				as="h2"
				color="#5b3800"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="800"
				fontSize={{ base: "40px", md: "45px" }}
				letterSpacing="-0.45px"
				mb="29px"
			>
				Education
			</Heading>
			<Text
				color="#281900"
				fontFamily="Inter, sans-serif"
				fontWeight="500"
				fontSize={{ base: "35px", md: "40px" }}
				lineHeight="1"
			>
				This can be brief
			</Text>
		</Box>
	);
};

export default ExperienceSection;
