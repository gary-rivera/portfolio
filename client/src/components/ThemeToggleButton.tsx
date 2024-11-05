import { useThemeContext } from '../context/ThemeContext';
import styles from '../styles/ThemeToggleButton.module.css';
import { Button } from '@chakra-ui/react';

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<Button onClick={toggleTheme} className={styles.button}>
			Switch to {theme === 'light' ? 'dark' : 'light'} mode
		</Button>
	);
};

export default ThemeToggleButton;
