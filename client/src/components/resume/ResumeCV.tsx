import React, { forwardRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";
import BgOverlay from "@/assets/resume-bg-overlay.svg?react";

const ResumeLayout = forwardRef<HTMLDivElement>((_, ref) => {
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
			ref={ref}
			align={{ base: "stretch", md: "flex-start" }}
			bg="#fef5f1"
			overflow="hidden"
			maxW="675px"
			w="auto"
			maxH="873px"
			h="auto"
			position="relative"
		>
			<Box
				opacity="0.5"
				position="absolute"
				left="30%"
				bottom="0"
				w="40%"
				h="50%"
				zIndex="1"
				maskImage="linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)), linear-gradient(85deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
				WebkitMaskImage="linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)), linear-gradient(85deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
				WebkitMaskComposite="destination-in"
			>
				<BgOverlay fill="#FF7230" />
			</Box>
			<ProfileSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.profile }} />
			<ExperienceSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.experience }} />
		</Flex>
	);
});

export default ResumeLayout;
