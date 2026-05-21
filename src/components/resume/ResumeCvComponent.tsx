import { forwardRef } from "react";
import { Flex } from "@chakra-ui/react";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";

const ResumeCvComponent = forwardRef<HTMLDivElement>((_, ref) => {
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
			bg="surface"
			overflow="hidden"
			maxW="675px"
			w="auto"
			maxH="873px"
			h="auto"
			position="relative"
		>
			<ProfileSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.profile }} />
			<ExperienceSection baseLayout={{ ...childrenLayout.base, ...childrenLayout.experience }} />
		</Flex>
	);
});

export default ResumeCvComponent;
