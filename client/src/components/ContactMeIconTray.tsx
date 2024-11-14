import { chakra, HStack } from "@chakra-ui/react";
import LinkedInSvgIcon from "@/assets/linkedin-logo.svg?react";
import GithubSvgIcon from "@/assets/github-logo.svg?react";
import ResumeCVIconDialog from "./resume/ResumeIcon";

const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
const USER_GITHUB_URL = "https://github.com/gary-rivera";

function ContactMeIconTray() {
	return (
		<HStack h="3rem" gap="0.2rem" border="2px solid red" w="min-content">
			<chakra.button
				as="a"
				href={USER_LINKEDIN_URL}
				display="flex"
				alignItems="center"
				justifyContent="center"
				color="blackAlpha.600"
				h="100%"
				w="4rem"
				p={0}
				_hover={{ bg: "blackAlpha.100", color: "var(--primary-blue)" }}
			>
				<LinkedInSvgIcon fill="currentColor" width="100%" height="100%" />
			</chakra.button>

			<chakra.button
				as="a"
				href={USER_GITHUB_URL}
				display="flex"
				alignItems="center"
				justifyContent="center"
				color="blackAlpha.600"
				h="100%"
				w="3rem"
				p={0}
				_hover={{ bg: "blackAlpha.200", color: "blackAlpha.950" }}
			>
				<GithubSvgIcon fill="currentColor" width="100%" height="100%" />
			</chakra.button>

			<ResumeCVIconDialog />
		</HStack>
	);
}

export default ContactMeIconTray;
