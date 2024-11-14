import ContactMeIconTray from "../ContactMeIconTray";
import TypingEffectHeader from "./TypingEffectHeader";
import { Box, VStack, HStack, Text, Flex } from "@chakra-ui/react";

function MainHeader() {
	return (
		<Box
			// borderLeft="4px dashed"
			// borderBottom="4px dashed"
			borderLeft="4px solid"
			borderColor="var(--primary-blue)"
			w="fit-content"
			px="3"
			pb="1.5"
		>
			<TypingEffectHeader />
			<Flex
				direction="column"
				justify="space-between"
				// alignItems="center"
				// bg="blackAlpha.50"
				mt="2"
				// blah
			>
				<Text>just some dweeb pretending to know what they're doing.</Text>

				<ContactMeIconTray />
			</Flex>
		</Box>
	);
}

export default MainHeader;
