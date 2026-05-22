import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readAppliedTheme(): Theme {
	const attr = document.documentElement.getAttribute("data-theme");
	return attr === "light" ? "light" : "dark";
}

export function useTheme(): [Theme, (next: Theme) => void] {
	const [theme, setThemeState] = useState<Theme>(readAppliedTheme);

	const setTheme = (next: Theme) => {
		setThemeState(next);
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.setAttribute("data-theme", next);
	};

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: light)");
		const onSystemChange = () => {
			if (localStorage.getItem(STORAGE_KEY)) return;
			const next: Theme = mq.matches ? "light" : "dark";
			setThemeState(next);
			document.documentElement.setAttribute("data-theme", next);
		};
		mq.addEventListener("change", onSystemChange);
		return () => mq.removeEventListener("change", onSystemChange);
	}, []);

	return [theme, setTheme];
}
