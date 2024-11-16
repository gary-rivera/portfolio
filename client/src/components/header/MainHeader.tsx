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
						height: "100%", // Adjusted height for viewport scaling
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
				<HStack
					h="2rem" // Responsive height based on viewport
					// h={["2rem", "3rem", "4rem"]} // Responsive height based on viewport
				>
					<motion.div
						style={{ display: "inline-block" }}
						initial={flipUpStyles.initial}
						animate={flipUpStyles.animate}
						onAnimationComplete={() => setIsLoadingAnimationComplete(true)}
					>
						<Text
							color="blackAlpha.700"
							fontSize={["xs", "sm", "md"]} // Responsive font size for different screen sizes
						>
							just some dweeb pretending to know what they're doing.
						</Text>
					</motion.div>
				</HStack>
			),
		},
	];

	return (
		<Box
			// w={["90%", "80%", "fit-content"]} // Scales with viewport width
			h={["15vh", "15vh", "20vh"]} // Scales with viewport height
			w="fit-content"
			px="3"
			// pb="1.5"
			position="relative"
			outline={["2px solid red", "2px solid blue", "2px solid green"]}
		>
			{steps.slice(0, currentStep + 1).map((step, index) => (
				<Box
					key={index}
					mb={["0.2rem", "0.3rem", "0.4rem"]} // Spacing between steps
				>
					{step.component}
				</Box>
			))}
		</Box>
	);
};

export default AppHeaderContainer;
