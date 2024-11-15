import { useState, useEffect } from "react";
import ContactMeIconTray from "../ContactMeIconTray";
import NameTypingEffect from "./NameTypingEffect";
import { chakra, Box, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

type AppHeaderContainerProps = {
	isLoadingAnimationComplete: boolean;
	setIsLoadingAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppHeaderContainer: React.FC<AppHeaderContainerProps> = ({
	isLoadingAnimationComplete,
	setIsLoadingAnimationComplete,
}) => {
	const [isTypingEffectComplete, setIsTypingEffectComplete] = useState(false);
	// const [isSubHeadingAnimationComplete, setIsSubHeadingAnimationComplete] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

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

	const steps = [
		{
			component: (
				<motion.div
					style={{
						position: "absolute",
						left: 0,
						height: "90px	",
						width: "4px",
						backgroundColor: "rgba(8, 145, 178, 0.7)",
					}}
					initial={{ y: "-75%", opacity: 0 }}
					animate={{
						y: "0",
						opacity: 1,
					}}
					transition={{
						type: "spring",
						damping: 45,
						stiffness: 400,
					}}
					onAnimationComplete={() => {
						setCurrentStep((prev) => prev + 1);
					}}
				/>
			),
		},
		{
			component: (
				<NameTypingEffect
					isComplete={isTypingEffectComplete}
					setIsComplete={() => {
						setCurrentStep((prev) => prev + 1);
						setIsTypingEffectComplete(() => true);
					}}
				/>
			),
		},
		{
			component: (
				<HStack h="2rem">
					<motion.div
						style={{ display: "inline-block" }}
						initial={flipUpStyles.initial}
						animate={flipUpStyles.animate}
						onAnimationComplete={() => setIsLoadingAnimationComplete(true)}
					>
						<Text color="blackAlpha.700">just some dweeb pretending to know what they're doing.</Text>
					</motion.div>
				</HStack>
			),
		},
	];

	return (
		<Box
			//
			w="fit-content"
			h="90px"
			px="3"
			// pb="1.5"
			position="relative"
			// outline="1px solid red"
		>
			<Flex
				direction="column"
				// justify="center"
				// outline="1px solid green"
				// h="100%"
			>
				{steps
					.slice(0, currentStep + 1) // Render up to the current step
					.map((step, index) => (
						<Box key={index}>{step.component}</Box>
					))}
			</Flex>
		</Box>
	);
};

export default AppHeaderContainer;
