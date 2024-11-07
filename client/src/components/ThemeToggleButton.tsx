import { useThemeContext } from '../context/ThemeContext';
import { Button } from '@chakra-ui/react';

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<Button
			onClick={toggleTheme}
			bg="var(--secondary-bg-color)"
			color="var(--text-color)"
		>
			Switch to {theme === 'light' ? 'dark' : 'light'} mode
		</Button>
	);
};

export default ThemeToggleButton;
