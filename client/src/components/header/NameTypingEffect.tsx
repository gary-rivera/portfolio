import { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import ResumeDialogContainer from "@/components/resume/ResumeDialogContainer";

const blink = keyframes`
  0% { opacity: 1; }
	40% { opacity: 0; }
  65% { opacity: 1; }
	95% { opacity: 1; }

`;

type NameTypingEffectProps = {
	isComplete: boolean;
	setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const NameTypingEffect: React.FC<NameTypingEffectProps> = ({ isComplete, setIsComplete }) => {
	const [text, setText] = useState("");
	const [wordIndex, setWordIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);
	const [typingStarted, setTypingStarted] = useState(false);

	const [isHovered, setIsHovered] = useState(false);
	const [isDialogOpen, setDialogOpen] = useState(false);

	const words = ["dinglega", "gary r."];
	const typingSpeed = 100;
	const deletingSpeed = 40;

	// Blink cursor before starting typing
	useEffect(() => {
		const blinkCursorTimeout = setTimeout(() => setTypingStarted(true), 1000);
		return () => clearTimeout(blinkCursorTimeout);
	}, []);

	useEffect(() => {
		if (!isTyping || !typingStarted) return;

		let timer: number;

		const handleTyping = () => {
			const currentWord = words[wordIndex];
			const isEndOfWord = text === currentWord;

			if (isDeleting) {
				setText((prevText) => prevText.slice(0, -1));
				if (text.length === 0) {
					setIsDeleting(false);
					setWordIndex((prevIndex) => prevIndex + 1);
				}
			} else if (!isEndOfWord) {
				setText((prevText) => currentWord.slice(0, prevText.length + 1));
			} else if (isEndOfWord && wordIndex === 0) {
				timer = window.setTimeout(() => setIsDeleting(true), 350);
			} else if (isEndOfWord && wordIndex === 1) {
				timer = window.setTimeout(() => {
					setIsTyping(false);
					setTimeout(() => setIsComplete(true), 500); // Wait 1s before setting isComplete
				}, 750);
			}
		};

		timer = window.setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
		return () => clearTimeout(timer);
	}, [text, isDeleting, wordIndex, isTyping, typingStarted, setIsComplete]);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<HStack fontSize="42px" fontWeight="900">
			<motion.div
				style={{
					position: "relative",
					display: "inline-block",
					lineHeight: "1",
					cursor: "pointer",
					zIndex: 1,
					pointerEvents: isComplete ? "auto" : "none",
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => setDialogOpen(!isDialogOpen)}
			>
				<Text
					lineHeight="1"
					mt="1"
					style={{
						zIndex: 2,
						color: isHovered ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.95)",
						pointerEvents: "none",
					}}
					mr="0"
				>
					{text}
				</Text>
				{isComplete && (
					<motion.div
						style={{
							zIndex: -1,
							position: "absolute",
							bottom: isHovered ? -3 : -1,
							left: -2,
							width: "100%",
							borderBottom: isHovered ? "0.22rem dotted" : "0.2rem dotted",
							borderBottomColor: isHovered ? "var(--primary-blue)" : "gray",
						}}
						initial={{ opacity: 0, bottom: -1, borderBottomColor: "gray" }}
						animate={{
							opacity: 1,
							bottom: isHovered ? -3 : -1,
							borderBottomColor: isHovered ? "var(--primary-blue)" : "gray",
							borderBottomWidth: isHovered ? "0.22rem" : "0.2rem",
						}}
						transition={{
							duration: 0.1,
							ease: "easeInOut",
						}}
					/>
				)}
			</motion.div>

			{isTyping && (
				<motion.div
					style={{
						display: "inline-block",
						lineHeight: "1",
						width: "0.1rem",
						height: "1em",
						backgroundColor: "rgba(0, 0, 0, 0.94)",
						marginLeft: "-2px",
					}}
					initial={{ opacity: 0 }}
					animate={{
						opacity: [0, 1, 0],
						scaleY: [1, 0.95, 1],
					}}
					transition={{
						duration: 0.7,
						repeat: Infinity,
						repeatType: "loop",
						ease: "easeInOut",
					}}
				/>
			)}
			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
		</HStack>
	);
};

export default NameTypingEffect;
