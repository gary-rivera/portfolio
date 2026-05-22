import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readAppliedTheme(): Theme {
	const attr = document.documentElement.getAttribute("data-theme");
	return attr === "light" ? "light" : "dark";
}

function flashThemeWash() {
	const wash = document.getElementById("theme-wash");
	if (!wash) return;
	wash.classList.remove("flash");
	void wash.offsetWidth;
	wash.classList.add("flash");
	document.documentElement.classList.add("theme-transitioning");
	window.setTimeout(() => {
		document.documentElement.classList.remove("theme-transitioning");
	}, 320);
}

export function useTheme(): [Theme, (next: Theme) => void] {
	const [theme, setThemeState] = useState<Theme>(readAppliedTheme);

	const setTheme = (next: Theme) => {
		if (next === theme) return;
		flashThemeWash();
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
