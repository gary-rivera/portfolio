import { chakra, VStack, HStack, Flex, Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import LinkIconFactory from "@/components/ui/chakra-fixes/LinkIconFactory";
import LinkedInSvgIcon from "@/assets/linkedin-small.svg?react";
import GithubSvgIcon from "@/assets/online-li-conversion.svg?react";
import { DiGithubFull } from "react-icons/di";

const LinkedInLogoSvg = () => (
	<chakra.svg>
		<></>
	</chakra.svg>
);

function ContactMeIconTray() {
	// const LinkedInLogo = chakra(LinkedInLogoSvg);

	return (
		<HStack h="2rem" gap="0.2">
			<ColorModeButton w="1rem" />
			<chakra.button
				// border="2px solid red"
				color="blackAlpha.600"
				py="0.5"
				px="1"
				h="inherit"
				_hover={{ bg: "blackAlpha.100", color: "var(--primary-blue)" }}
			>
				<chakra.a>
					<LinkedInSvgIcon
						fill="currentColor"
						style={{
							width: "auto",
							height: "inherit",
						}}
					/>
				</chakra.a>
			</chakra.button>
			<chakra.button
				// border="2px solid red"
				color="blackAlpha.600"
				py="0.5"
				px="1"
				h="inherit"
				_hover={{ bg: "blackAlpha.200", color: "blackAlpha.950" }}
			>
				<chakra.a>
					<GithubSvgIcon
						fill="currentColor"
						style={{
							maxHeight: "inherit",
							width: "auto",

							height: "inherit",
						}}
					/>
				</chakra.a>
				{/* <LinkedInSvgIcon w="150px" h="50px" /> */}
			</chakra.button>
		</HStack>
	);
}

export default ContactMeIconTray;
