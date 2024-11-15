import { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import ResumeCVIconDialog from "@/components/resume/ResumeIcon";
import ActionableTextHighlight from "../ui/ActionableTextHighlight";
import { motion, AnimatePresence } from "framer-motion";

const blink = keyframes`
	0% { opacity: 1; }
	25%: { opacity: 0.5; }
	50% { opacity: 0; }
	75%: { opacity: 0.5; }
	100% { opacity: 1; }
`;

const onceCompletedStyling = {
	textDecoration: "underline",
	textDecorationStyle: "dotted",
	textDecorationThickness: "0.16rem",
	textDecorationColor: "gray",
	textUnderlineOffset: "0.2rem",

	_hover: {
		textDecorationColor: "var(--primary-blue)",
		// bg: "blackAlpha.50",
		color: "blackAlpha.800",
		textDecorationThickness: "0.175rem",
		// textUnderlineOffset: "0.25rem",
	},
	_focus: {
		outline: "none",
		boxShadow: "none",
	},
};
const NameTypingEffect = () => {
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [wordIndex, setWordIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const [blinkEnded, setBlinkEnded] = useState(false);
	const words = ["dinglega", "gary r."];
	const typingSpeed = 100;
	const deletingSpeed = 40;

	// Typing effect logic
	useEffect(() => {
		let timer: number;

		const handleTyping = () => {
			const currentWord = words[wordIndex];
			const isEndOfWord = text === currentWord;

			if (isDeleting) {
				setText((prevText) => prevText.slice(0, -1));

				if (text === "") {
					setIsDeleting(false);
					setWordIndex(1);
				}
			} else if (!isEndOfWord) {
				setText((prevText) => currentWord.slice(0, prevText.length + 1));
			} else if (isEndOfWord && wordIndex === 0) {
				timer = window.setTimeout(() => setIsDeleting(true), 350);
			} else if (isEndOfWord && wordIndex === 1) {
				setIsComplete(true);
			}
		};

		if (!isComplete) {
			timer = window.setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
		} else {
			// Allow one last blink before stopping
			timer = window.setTimeout(() => setBlinkEnded(true), 1500);
		}

		return () => clearTimeout(timer);
	}, [text, isDeleting, wordIndex, isComplete]);

	return (
		<HStack fontSize="42px" fontWeight="900">
			<Text lineHeight="1" {...(isComplete && onceCompletedStyling)}>
				{text}
			</Text>
			{/* {isComplete ? <ActionableTextHighlight>{text}</ActionableTextHighlight> : <Text lineHeight="1">{text}</Text>} */}
			{!isComplete && !blinkEnded && (
				<Text
					lineHeight="1"
					fontSize="1"
					w="0.1rem"
					backgroundColor="var(--primary-blue)"
					marginLeft="2px"
					animation={`${blink} 750ms infinite`}
				>
					&nbsp;
				</Text>
			)}
		</HStack>
	);
};

export default NameTypingEffect;
