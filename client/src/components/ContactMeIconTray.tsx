import { chakra, VStack, HStack, Flex, Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import LinkedInSvgIcon from "@/assets/linkedin-small.svg?react";

function ContactMeIconTray() {
	return (
		<VStack>
			<ColorModeButton w="2rem" />
		</VStack>
	);
}

export default ContactMeIconTray;
