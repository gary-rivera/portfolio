import { useState, useEffect } from "react";
import ContactMeIconTray from "../ContactMeIconTray";
import NameTypingEffect from "./NameTypingEffect";
import { chakra, Box, VStack, HStack, Text, Flex, Spacer } from "@chakra-ui/react";
import { motion } from "framer-motion";

type AppHeaderContainerProps = {
	isLoadingAnimationComplete: boolean;
	setIsLoadingAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const halfWayLinesStyle = {
	position: "relative",
	width: "100%",
	height: "100%",
	"::before": {
		content: '""',
		position: "absolute",
		left: "50%",
		top: "0",
		bottom: "0",
		width: "1px",
		backgroundColor: "red",
		transform: "translateX(-50%)", // Ensures the red line is centered
	},
	"::after": {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "0",
		right: "0",
		height: "1px",
		backgroundColor: "green",
		transform: "translateY(-50%)", // Ensures the green line is centered
	},
};

const halfWayLinesChakraStyle = {
	position: "relative",
	// w: "100%",
	// h: "100%",
	_before: {
		content: '""',
		position: "absolute",
		left: "50%",
		top: "0",
		bottom: "0",
		w: "1px",
		bg: "red.500",
		transform: "translateX(-50%)", // Center red vertical line
	},
	_after: {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "0",
		right: "0",
		h: "1px",
		bg: "green.500",
		transform: "translateY(-50%)", // Center green horizontal line
	},
};

const AppHeaderContainer: React.FC<AppHeaderContainerProps> = ({
	isLoadingAnimationComplete,
	setIsLoadingAnimationComplete,
}) => {
	const [isTypingEffectComplete, setIsTypingEffectComplete] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [verticalBarComplete, setVerticalBarComplete] = useState(false);
	const [headerComplete, setHeaderComplete] = useState(false);

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
						top: 0,
						height: "100%",
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
				<>
					<NameTypingEffect
						isComplete={isTypingEffectComplete}
						setIsComplete={() => {
							setCurrentStep((prev) => prev + 1);
							setIsTypingEffectComplete(() => true);
						}}
					/>
					<Flex
						h="auto"
						w="100%"
						alignItems="start"
						// outline={["2px solid yellow", "2px solid orange", "2px solid red"]}
					>
						{isTypingEffectComplete && (
							<motion.div
								style={{ display: "inline-block" }}
								initial={flipUpStyles.initial}
								animate={flipUpStyles.animate}
								onAnimationComplete={() => setIsLoadingAnimationComplete(true)}
							>
								<Text color="blackAlpha.700" fontSize={["0.7rem", "sm", "md"]}>
									just some dweeb pretending to know what they're doing.
								</Text>
							</motion.div>
						)}
					</Flex>
					<Spacer />
				</>
			),
		},
		// {
		// 	component: (
		// 		<HStack h="5vh">
		// 			<motion.div
		// 				style={{ display: "inline-block" }}
		// 				initial={flipUpStyles.initial}
		// 				animate={flipUpStyles.animate}
		// 				onAnimationComplete={() => setIsLoadingAnimationComplete(true)}
		// 			>
		// 				<Text color="blackAlpha.700" fontSize={["xs", "sm", "md"]}>
		// 					just some dweeb pretending to know what they're doing.
		// 				</Text>
		// 			</motion.div>
		// 		</HStack>
		// 	),
		// },
	];

	return (
		<Flex
			h="10vh" // Allow height to grow naturally
			w="fit-content"
			px="3"
			position="relative"
			direction="column"
			justify="center"
			{...halfWayLinesChakraStyle}
			// outline={["2px solid red", "2px solid blue", "2px solid green"]}
		>
			{steps.map((step, index) => (
				<Box
					key={index}
					mb={["0.1rem", "0.2rem", "0.1rem"]}
					h="100%"
					style={{
						visibility: currentStep >= index ? "visible" : "hidden",
						height: currentStep >= index ? "auto" : "0px", // Reserve space for each step
					}}
				>
					{step.component}
				</Box>
			))}
		</Flex>
	);
};

export default AppHeaderContainer;
