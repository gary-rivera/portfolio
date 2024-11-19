import { useState } from "react";
import NameTypingEffect from "./NameTypingEffect";
import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

type AppHeaderContainerProps = {
	setIsLoadingAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppHeaderContainer: React.FC<AppHeaderContainerProps> = ({ setIsLoadingAnimationComplete }) => {
	const [isTypingEffectComplete, setIsTypingEffectComplete] = useState(false);

	const flipUpStyles = {
		initial: {
			opacity: 0,
			rotateX: -90,
			transformOrigin: "bottom center",
		},
		animate: {
			opacity: 1,
			rotateX: 0,
			transition: {
				duration: 1,
				ease: "easeOut",
			},
		},
	};

	return (
		<Flex
			h="10vh"
			w="fit-content"
			px="3"
			position="relative"
			direction="column"
			justify="center"
			minH="90px"
			alignSelf="flex-start"
		>
			{/* vertical bar */}
			{isTypingEffectComplete && (
				<motion.div
					style={{
						position: "absolute",
						left: 0,
						top: 0,
						height: "100%",
						width: "4px",
						backgroundColor: "rgba(8, 145, 178, 0.7)",
					}}
					initial={flipUpStyles.initial}
					animate={flipUpStyles.animate}
				/>
			)}
			{/* text container */}
			<Flex
				width="100%"
				height="100%"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="start"
				mt={["0.5rem", "0.5rem", "0.3rem", "0.3rem"]}
			>
				<NameTypingEffect
					isComplete={isTypingEffectComplete}
					setIsComplete={() => {
						setIsTypingEffectComplete(() => true);
						setIsLoadingAnimationComplete(() => true);
					}}
				/>

				{/* Sub-header */}
				<Box h="50%">
					{isTypingEffectComplete && (
						<motion.div
							style={{ display: "inline-block" }}
							initial={flipUpStyles.initial}
							animate={flipUpStyles.animate}
						>
							<Text color="blackAlpha.700" fontSize={["0.7rem", "sm", "md"]}>
								just some dweeb pretending to know what they're doing.
							</Text>
						</motion.div>
					)}
				</Box>
			</Flex>
		</Flex>
	);
};

export default AppHeaderContainer;
