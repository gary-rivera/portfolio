import { chakra, HStack, Spacer } from "@chakra-ui/react";

import LinkedInTextSvg from "@/assets/icons/experience/linkedin-text-logo.svg?react";
import GithubTextSvg from "../assets/icons/experience/github-text-logo.svg?react";
import ResumeCVIconDialog from "./resume/ResumeIcon";
// import SquareCVIcon from "@/assets/square-cv-online.svg?react";

const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
export const USER_GITHUB_URL = "https://github.com/gary-rivera";

import { ReactNode } from "react";

interface SocialIconProps {
	children: ReactNode;
	buttonProps?: object;
	url: string;
}

const SocialIcon = ({ children, buttonProps, url }: SocialIconProps) => (
	<chakra.button
		as="a"
		// @ts-ignore
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		display="flex"
		alignItems="center"
		justifyContent="center"
		color="blackAlpha.500"
		h="100%"
		w="3rem"
		// px="1"
		_hover={{ color: "blackAlpha.950" }}
		// bg="yellow"
		// border={`2px solid`}
		borderRadius="md"
		{...buttonProps}
	>
		{children}
	</chakra.button>
);

function ContactMeIconTray() {
	return (
		<HStack h="20px" gap="0.3rem" w="min-content" alignItems="center">
			<SocialIcon
				children={<LinkedInTextSvg fill="currentColor" width="100%" height="12px" />}
				buttonProps={{ _hover: { color: "var(--primary-blue)" }, w: "3rem" }}
				url={USER_LINKEDIN_URL}
			/>
			<Spacer h="inherit" borderRadius="full" borderRight="1.5px solid" borderColor="blackAlpha.500" />

			<SocialIcon
				children={<GithubTextSvg fill="currentColor" width="100%" height="12px" />}
				buttonProps={{
					w: "2.1rem",
					// outline: "1px solid green",
				}}
				url={USER_GITHUB_URL}
			/>
			<Spacer h="inherit" borderRadius="full" borderRight="1.5px solid" borderColor="blackAlpha.500" />

			<ResumeCVIconDialog />

			{/* email icon? */}
		</HStack>
	);
}

export default ContactMeIconTray;
