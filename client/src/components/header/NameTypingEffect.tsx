import { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const blink = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.5; }
  50% { opacity: 0; }
  75% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const NameTypingEffect = () => {
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [wordIndex, setWordIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const [blinkEnded, setBlinkEnded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const words = ["dinglega", "gary r."];
	const typingSpeed = 100;
	const deletingSpeed = 40;

	// Typing effect logic
	useEffect(() => {
		let timer: number; // Explicitly type the timer variable

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

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<HStack fontSize="42px" fontWeight="900">
			{/* Wrap the Text component and underline in a motion.div */}
			<motion.div
				style={{
					position: "relative",
					display: "inline-block",
					lineHeight: "1",
					cursor: "pointer",
					zIndex: 1,
				}}
				onMouseEnter={handleMouseEnter} // Track hover state on container
				onMouseLeave={handleMouseLeave}
			>
				<Text
					lineHeight="1"
					style={{
						zIndex: 2,
						position: "relative",
					}}
				>
					{text}
				</Text>
				{isComplete && (
					<motion.div
						style={{
							zIndex: 1,
							position: "absolute",
							bottom: 0,
							left: 0,
							width: "100%",
							borderBottom: "2px dotted",
							borderBottomColor: isHovered ? "var(--primary-blue)" : "gray", // Change color on hover
							transition: "border-bottom-color 0.5s ease", // Smooth color transition
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					/>
				)}
			</motion.div>
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
