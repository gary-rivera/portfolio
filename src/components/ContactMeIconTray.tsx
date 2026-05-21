import { chakra, HStack } from "@chakra-ui/react";

import LinkedInTextSvg from "@/assets/icons/experience/linkedin-text-logo.svg?react";
import GithubTextSvg from "../assets/icons/experience/github-text-logo.svg?react";
import ResumeCVIconDialog from "./resume/ResumeIcon";

const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
export const USER_GITHUB_URL = "https://github.com/gary-rivera";

import { ReactNode } from "react";

interface SocialIconProps {
	children: ReactNode;
	url: string;
}

const SocialIcon = ({ children, url }: SocialIconProps) => (
	<chakra.a
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		display="inline-flex"
		alignItems="center"
		color="textMuted"
		transition="color 200ms var(--ease-out)"
		_hover={{ color: "textPrimary" }}
	>
		{children}
	</chakra.a>
);

function ContactMeIconTray() {
	return (
		<HStack gap="1rem" mt="0.5rem">
			<SocialIcon url={USER_LINKEDIN_URL}>
				<LinkedInTextSvg fill="currentColor" height="12px" />
			</SocialIcon>
			<chakra.div w="1px" h="10px" bg="hairlineStrong" />
			<SocialIcon url={USER_GITHUB_URL}>
				<GithubTextSvg fill="currentColor" height="12px" />
			</SocialIcon>
			<chakra.div w="1px" h="10px" bg="hairlineStrong" />
			<ResumeCVIconDialog />
		</HStack>
	);
}

export default ContactMeIconTray;
