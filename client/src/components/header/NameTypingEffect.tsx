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
	const [isDeleting, setIsDeleting] = useState(false);
	const [wordIndex, setWordIndex] = useState(0);

	const [typingStarted, setTypingStarted] = useState(false);
	const [isTyping, setIsTyping] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	const [isDialogOpen, setDialogOpen] = useState(false);

	const words = ["dinglega", "gary r."];
	const typingSpeed = 100;
	const deletingSpeed = 40;

	// allow cursor to blink a bit before typing
	useEffect(() => {
		if (!typingStarted) setTimeout(() => setTypingStarted(true), 1250);
	}, []);

	useEffect(() => {
		if (!typingStarted) return;
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
		}

		return () => clearTimeout(timer);
	}, [text, isDeleting, wordIndex, isComplete, isTyping, typingStarted]);

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
						zIndex: 999,
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
							duration: 0.45,
							ease: "easeInOut",
						}}
					/>
				)}
			</motion.div>

			{isTyping && (
				<Text
					lineHeight="1"
					fontSize="1"
					w="0.1rem"
					backgroundColor="rgba(0, 0, 0, 0.94)"
					marginLeft="-2"
					animation={`${blink} 0.7s steps(1) infinite`}
				>
					&nbsp;
				</Text>
			)}
			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
		</HStack>
	);
};

export default NameTypingEffect;
