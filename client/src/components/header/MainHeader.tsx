import TypingEffectHeader from './TypingEffectHeader';
import styles from '../../styles/MainHeader.module.css';
import { Box, HStack, Divider } from '@chakra-ui/react';

function MainHeader() {
	return (
		<Box className={styles.header}>
			<TypingEffectHeader />
			<HStack>just some dweeb pretending to know what they're doing.</HStack>
		</Box>
	);
}

export default MainHeader;
