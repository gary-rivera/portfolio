import { useThemeContext } from "../context/ThemeContext";
import { Button } from "@chakra-ui/react";

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<Button onClick={toggleTheme} bg="surfaceRaised" color="textPrimary">
			Switch to {theme === "light" ? "dark" : "light"} mode
		</Button>
	);
};

export default ThemeToggleButton;
