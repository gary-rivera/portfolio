import React from "react";
import { Box, Text, Image, Heading, Spacer, List, ListItem, useBreakpointValue } from "@chakra-ui/react";

const ProfileSection = () => {
	const skills = [
		"Bullet points",
		"One after",
		"The other",
		"And whatnot",
		"We'll turn your",
		"Summary text into",
		"Digestible bulletpoints",
	];

	const techStack = Array(26).fill("Stack"); // Same as your long tech stack

	return (
		<Box
			bg="#031b20"
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
			color="white"
			w={{ base: "100%", md: "46%" }}
			p={{ base: "40px 20px", md: "79px 60px" }}
			mt={{ base: "40px", md: "0" }}
			fontFamily="Inter, sans-serif"
			fontWeight="500"
			fontSize="22px"
		>
			<Image
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/834c2e7d790409beaeef42aad0cf7386ebcd148fcbf1859d4c69ace0ccd5d399?placeholderIfAbsent=true&apiKey=0d9129ea52684a33ba664902d9f1ba79"
				alt="Profile"
				w="141px"
				h="141px"
				objectFit="contain"
			/>
			<Heading
				as="h1"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="400"
				fontSize={{ base: "40px", md: "51px" }}
				mt="39px"
				letterSpacing="-0.51px"
			>
				Gary Rivera
			</Heading>
			<Heading
				as="h2"
				fontFamily="'Kannada Sangam MN', -apple-system, Roboto, Helvetica, sans-serif"
				fontWeight="400"
				fontSize="29px"
				mt="30px"
			>
				Senior Engineer, Designer
			</Heading>
			<Spacer bg="rgba(120, 159, 161, 0.5)" h="2px" w="60px" mt="48px" borderRadius="md" />
			<Text color="#789fa1" mt="23px" letterSpacing="0.45px">
				gary@dinglegary.io
			</Text>
			<Text color="#789fa1" mt="23px" letterSpacing="0.45px">
				415-654-8327
			</Text>
			<Text color="#789fa1" mt="23px" letterSpacing="0.45px">
				Olympia, WA & San Francisco
			</Text>
			<Text mt="49px" fontSize="21px" lineHeight="31px" letterSpacing="0.22px">
				A bio can go here, aka space to craft the most thought-provoking paragraph and self-introduction mankind has
				ever read throughout history, space, and time.
			</Text>
			<Box mt="20px">
				<Heading as="h3" fontWeight="700" fontSize="22px" lineHeight="24px" mb="10px">
					Skills
				</Heading>
				<List.Root spacing="2" styleType="none">
					{skills.map((skill, index) => (
						<List.Item key={index} lineHeight="24px">
							{skill}
						</List.Item>
					))}
				</List.Root>
			</Box>
			<Heading as="h3" fontWeight="700" fontSize="21px" lineHeight="38px" letterSpacing="0.21px" mt="62px">
				Tech Stack
			</Heading>
			<Text mt="39px" color="#789fa1" fontSize="19px" lineHeight="38px" letterSpacing="0.19px">
				{techStack.join(" ")}
			</Text>
		</Box>
	);
};

export default ProfileSection;
