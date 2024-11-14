import { chakra, HStack } from "@chakra-ui/react";
import LinkedInSvgIcon from "@/assets/linkedin-logo.svg?react";
import GithubSvgIcon from "@/assets/github-logo.svg?react";
import ResumeCVIconDialog from "./resume/ResumeIcon";
import SquareCVIcon from "@/assets/square-cv-online.svg?react";

const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
const USER_GITHUB_URL = "https://github.com/gary-rivera";

const SocialIcon = ({ children, buttonProps, url }) => (
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
		<HStack
			h="auto"
			gap="0.35rem"
			// border="2px solid red"
			w="min-content"
		>
			<SocialIcon
				children={<LinkedInSvgIcon fill="currentColor" width="100%" height="100%" />}
				buttonProps={{ _hover: { color: "var(--primary-blue)" } }}
				url={USER_LINKEDIN_URL}
			/>
			<SocialIcon
				children={<GithubSvgIcon fill="currentColor" width="100%" height="100%" />}
				buttonProps={{ w: "2.1rem" }}
				url={USER_GITHUB_URL}
			/>
			<ResumeCVIconDialog />

			{/* email icon? */}
		</HStack>
	);
}

export default ContactMeIconTray;
