import { useEffect, useState } from 'react';
import styles from '../../styles/TypingEffectHeader.module.css';
import { HStack, Text } from '@chakra-ui/react';

const TypingEffect = () => {
	const [text, setText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [wordIndex, setWordIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const [blinkEnded, setBlinkEnded] = useState(false); // Tracks when blinking should stop
	const words = ['dinglega', 'gary r.'];
	const typingSpeed = 100;
	const deletingSpeed = 40;

	useEffect(() => {
		let timer: number;

		const handleTyping = () => {
			const currentWord = words[wordIndex];
			const isEndOfWord = text === currentWord;

			if (isDeleting) {
				setText((prevText) => prevText.slice(0, -1));

				if (text === '') {
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
			timer = window.setTimeout(
				handleTyping,
				isDeleting ? deletingSpeed : typingSpeed
			);
		} else {
			// Allow one last blink before stopping
			timer = window.setTimeout(() => setBlinkEnded(true), 1500);
		}

		return () => clearTimeout(timer);
	}, [text, isDeleting, wordIndex, isComplete]);

	return (
		<HStack className={styles.typingContainer}>
			<Text className={styles.typedText}>{text}</Text>
			<Text
				className={
					isComplete && blinkEnded ? styles.cursorStopped : styles.cursor
				}
			>
				&nbsp;
			</Text>
		</HStack>
	);
};

export default TypingEffect;
