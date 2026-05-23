import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

type DocumentWithVT = Document & {
	startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

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

export function useTheme(): [Theme, (next: Theme, e?: { clientX: number; clientY: number }) => void] {
	const [theme, setThemeState] = useState<Theme>(readAppliedTheme);

	const setTheme = (next: Theme, e?: { clientX: number; clientY: number }) => {
		if (next === theme) return;

		const apply = () => {
			setThemeState(next);
			localStorage.setItem(STORAGE_KEY, next);
			document.documentElement.setAttribute("data-theme", next);
		};

		const doc = document as DocumentWithVT;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (doc.startViewTransition && !reduced) {
			const x = e?.clientX ?? window.innerWidth - 32;
			const y = e?.clientY ?? 32;
			document.documentElement.style.setProperty("--ripple-x", `${x}px`);
			document.documentElement.style.setProperty("--ripple-y", `${y}px`);
			document.documentElement.classList.add("theme-ripple");
			const transition = doc.startViewTransition(() => {
				apply();
			});
			transition.finished.finally(() => {
				document.documentElement.classList.remove("theme-ripple");
			});
			return;
		}

		flashThemeWash();
		apply();
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
