import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import ResumeDialogContainer from "@/components/resume/ResumeDialogContainer";
import { HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

type NameTypingEffectProps = {
	isComplete: boolean;
	setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const deletingSpeed = 32;

type State = {
	text: string;
	wordIndex: number;
	isTyping: boolean;
	isDeleting: boolean;
	typingStarted: boolean;
	isHovered: boolean;
	isDialogOpen: boolean;
};

type Action =
	| { type: "SET_TEXT"; payload: string }
	| { type: "SET_TYPING_STARTED" }
	| { type: "SET_IS_TYPING"; payload: boolean }
	| { type: "SET_IS_DELETING"; payload: boolean }
	| { type: "SET_WORD_INDEX"; payload: number }
	| { type: "TOGGLE_DIALOG" }
	| { type: "SET_HOVER"; payload: boolean };

const initialState: State = {
	text: "",
	wordIndex: 0,
	isTyping: true,
	isDeleting: false,
	typingStarted: false,
	isHovered: false,
	isDialogOpen: false,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_TEXT":
			return { ...state, text: action.payload };
		case "SET_TYPING_STARTED":
			return { ...state, typingStarted: true };
		case "SET_IS_TYPING":
			return { ...state, isTyping: action.payload };
		case "SET_IS_DELETING":
			return { ...state, isDeleting: action.payload };
		case "SET_WORD_INDEX":
			return { ...state, wordIndex: action.payload };
		case "TOGGLE_DIALOG":
			return { ...state, isDialogOpen: !state.isDialogOpen };
		case "SET_HOVER":
			return { ...state, isHovered: action.payload };
		default:
			return state;
	}
};

const getTypingSpeedForWord = (wordIndex: number) => {
	if (wordIndex === 0) {
		return { minSpeed: 40, maxSpeed: 60 };
	}
	if (wordIndex === 1) {
		return { minSpeed: 70, maxSpeed: 110 };
	}
	return { minSpeed: 73, maxSpeed: 193 };
};

const getRandomTypingSpeed = (wordIndex: number) => {
	const { minSpeed, maxSpeed } = getTypingSpeedForWord(wordIndex);
	return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
};

const NameTypingEffect: React.FC<NameTypingEffectProps> = ({ isComplete, setIsComplete }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const words = useMemo(() => ["dinglega", "gary r."], []);

	useEffect(() => {
		const blinkCursorTimeout = setTimeout(() => {
			dispatch({ type: "SET_TYPING_STARTED" });
		}, 1000);

		return () => clearTimeout(blinkCursorTimeout);
	}, []);

	useEffect(() => {
		console.log("state.isDialogOpen", state.isDialogOpen);
		if (!state.isTyping || !state.typingStarted) return;

		let timer: number;

		const handleTyping = () => {
			const currentWord = words[state.wordIndex];
			const isEndOfWord = state.text === currentWord;

			if (state.isDeleting) {
				dispatch({
					type: "SET_TEXT",
					payload: state.text.slice(0, -1),
				});

				if (state.text.length === 1) {
					dispatch({ type: "SET_IS_DELETING", payload: false });
					dispatch({ type: "SET_WORD_INDEX", payload: state.wordIndex + 1 });
				}
			} else if (!isEndOfWord) {
				dispatch({
					type: "SET_TEXT",
					payload: currentWord.slice(0, state.text.length + 1),
				});
			} else if (isEndOfWord) {
				if (state.wordIndex === 0) {
					timer = window.setTimeout(() => dispatch({ type: "SET_IS_DELETING", payload: true }), 350);
				} else if (state.wordIndex === 1) {
					timer = window.setTimeout(() => {
						dispatch({ type: "SET_IS_TYPING", payload: false });
						window.setTimeout(() => setIsComplete(true), 250);
					}, 750);
				}
			}
		};

		timer = window.setTimeout(handleTyping, state.isDeleting ? deletingSpeed : getRandomTypingSpeed(state.wordIndex));
		return () => clearTimeout(timer);
	}, [state.text, state.isDeleting, state.wordIndex, state.isTyping, state.typingStarted, words, setIsComplete]);

	const handleMouseEnter = useCallback(() => {
		dispatch({ type: "SET_HOVER", payload: true });
	}, []);

	const handleMouseLeave = useCallback(() => {
		dispatch({ type: "SET_HOVER", payload: false });
	}, []);

	const toggleDialog = useCallback(() => {
		dispatch({ type: "TOGGLE_DIALOG" });
	}, []);

	return (
		<HStack fontSize="42px" fontWeight="900">
			<motion.div
				style={{
					position: "relative",
					display: "inline-block",
					lineHeight: "1",
					cursor: "pointer",
					zIndex: 1,
					pointerEvents: state.isTyping ? "none" : "auto",
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={toggleDialog}
			>
				<Text
					lineHeight="1"
					fontSize={["4xl", "2.75rem", "5xl"]}
					style={{
						zIndex: 2,
						color: state.isHovered ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.95)",
						pointerEvents: "none",
					}}
					mr="0"
				>
					{state.text}
				</Text>
				{isComplete && (
					<motion.div
						style={{
							zIndex: -1,
							position: "absolute",
							bottom: state.isHovered ? -3 : -1,
							left: -2,
							width: "100%",
							borderBottomWidth: state.isHovered ? "0.22rem" : "0.2rem",
							borderBottomStyle: "dotted",
							borderBottomColor: state.isHovered ? "var(--primary-blue)" : "rgba(161,161,170)",
						}}
						initial={{ opacity: 0, bottom: -1, borderBottomColor: "rgba(161,161,170)" }}
						animate={{
							opacity: 1,
							bottom: state.isHovered ? -3 : -1,
							borderBottomColor: state.isHovered ? "var(--primary-blue)" : "rgba(161,161,170)",
							borderBottomWidth: state.isHovered ? "0.22rem" : "0.2rem",
						}}
						transition={{
							opacity: { duration: 0.6, ease: "easeInOut" },
							bottom: { duration: 0.1, ease: "easeInOut" },
							borderBottomColor: { duration: 0.1, ease: "easeInOut" },
							borderBottomWidth: { duration: 0.1, ease: "easeInOut" },
						}}
					/>
				)}
			</motion.div>

			{state.isTyping && (
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
			<ResumeDialogContainer isOpen={state.isDialogOpen} onClose={toggleDialog} />
		</HStack>
	);
};

export default NameTypingEffect;
