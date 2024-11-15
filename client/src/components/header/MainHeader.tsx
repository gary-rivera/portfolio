import { useState, useEffect } from "react";
import ContactMeIconTray from "../ContactMeIconTray";
import NameTypingEffect from "./NameTypingEffect";
import { chakra, Box, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

function MainHeader() {
	const [isLoadingAnimationComplete, setIsLoadingAnimationComplete] = useState(false);
	const [isTypingEffectComplete, setIsTypingEffectComplete] = useState(false);
	const [isSubHeadingAnimationComplete, setIsSubHeadingAnimationComplete] = useState(false);
	// wait for typing of name to finish
	useEffect(() => {
		if (isTypingEffectComplete) {
			setIsLoadingAnimationComplete(true);
		}
	}, [isTypingEffectComplete]);
	// animation on load is considered complete setIsLoadingAnimationComplete -> true

	const flipUpStyles = {
		initial: {
			opacity: 0,
			rotateX: -90, // Start with text facing downwards
			transformOrigin: "bottom center",
		},
		animate: {
			opacity: 1,
			rotateX: 0, // End with text facing forward
			transition: {
				duration: 0.8, // Customize duration for smoothness
				ease: "easeOut",
			},
		},
	};

	return (
		<Box
			// borderLeft="4px solid"
			borderColor="var(--primary-blue)"
			w="fit-content"
			px="3"
			pb="1.5"
			position="relative"
		>
			{isTypingEffectComplete && (
				<motion.div
					style={{
						position: "absolute",
						left: 0,
						height: "100%",
						width: "4px",
						backgroundColor: "rgba(8, 145, 178, 0.6)",
					}}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { duration: 1.2, ease: "easeInOut" },
					}}
				/>
			)}

			<NameTypingEffect isComplete={isTypingEffectComplete} setIsComplete={setIsTypingEffectComplete} />

			<HStack h="2rem">
				{isTypingEffectComplete && (
					<motion.div style={{ display: "inline-block" }} initial={flipUpStyles.initial} animate={flipUpStyles.animate}>
						<Text>just some dweeb pretending to know what they're doing.</Text>
					</motion.div>
				)}
			</HStack>
		</Box>
	);
}

export default MainHeader;
