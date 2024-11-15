import { useState, useEffect } from "react";
import ContactMeIconTray from "../ContactMeIconTray";
import NameTypingEffect from "./NameTypingEffect";
import { Box, VStack, HStack, Text, Flex } from "@chakra-ui/react";

function MainHeader() {
	const [isLoadingAnimationComplete, setIsLoadingAnimationComplete] = useState(false);
	const [isTypingEffectComplete, setIsTypingEffectComplete] = useState(false);
	const [isSubHeadingAnimationComplete, setIsSubHeadingAnimationComplete] = useState(false);
	// wait for typing of name to finish
	useEffect(() => {
		if (isTypingEffectComplete) {
			console.log("[mainheader] notified isTypingEffectComplete is true");
			// trigger sub header animation
			// then scroll the sub-header text into view
		}
	}, [isTypingEffectComplete]);
	// animation on load is considered complete setIsLoadingAnimationComplete -> true

	return (
		<Box borderLeft="4px solid" borderColor="var(--primary-blue)" w="fit-content" px="3" pb="1.5">
			<NameTypingEffect isComplete={isTypingEffectComplete} setIsComplete={setIsTypingEffectComplete} />
			<Flex
				direction="column"
				justify="space-between"
				mt="2"
				// blah
			>
				<Text>just some dweeb pretending to know what they're doing.</Text>
			</Flex>
		</Box>
	);
}

export default MainHeader;
