import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";

const ResumeLayout = () => {
	const childrenLayout = {
		base: {
			h: "auto",
			px: "33px",
			py: "30px",
		},
		profile: {
			w: "38%",
		},
		experience: {
			w: "62%",
		},
	};
	return (
		<Flex
			align={{ base: "stretch", md: "flex-start" }}
			bg="#fef5f1"
			overflow="hidden"
			w="675px" // TODO: final step will be to make this responsive
			h="873x"
		>
			<ProfileSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.profile }} />
			<ExperienceSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.experience }} />
		</Flex>
	);
};

export default ResumeLayout;
