import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext({
	theme: 'dark',
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('color-theme') as Theme;
		return savedTheme || 'dark';
	});

	useEffect(() => {
		document.documentElement.setAttribute('color-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
