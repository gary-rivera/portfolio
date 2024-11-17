import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";

const ResumeLayout = () => {
	return (
		<Box
			bg="#feefe8"
			px={{ base: "20px", md: "71px" }}
			overflow="hidden"
			outline="1px solid red
		"
		>
			<Flex
				// direction={{ base: "column", md: "row" }}
				gap={{ base: 0, md: "20px" }}
				align={{ base: "stretch", md: "flex-start" }}
			>
				<ProfileSection />
				<ExperienceSection />
			</Flex>
		</Box>
	);
};

export default ResumeLayout;
