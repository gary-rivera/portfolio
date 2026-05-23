import { useEffect } from "react";

const ACTIVE_TITLES = [
	"gary@portfolio:~$ whoami",
	"gary@portfolio:~$ ls ./work",
	"gary@portfolio:~$ cat ./contact",
	"gary@portfolio:~$ tail -f ~/now",
];
const IDLE_TITLE = "gary@portfolio:~$ _";
const CYCLE_MS = 4200;

export function useDynamicTitle() {
	useEffect(() => {
		let i = 0;
		const setActive = () => {
			document.title = ACTIVE_TITLES[i % ACTIVE_TITLES.length];
			i += 1;
		};
		const setIdle = () => {
			document.title = IDLE_TITLE;
		};

		const apply = () => {
			if (document.hidden) setIdle();
			else setActive();
		};
		apply();

		const interval = window.setInterval(() => {
			if (!document.hidden) setActive();
		}, CYCLE_MS);
		document.addEventListener("visibilitychange", apply);

		return () => {
			window.clearInterval(interval);
			document.removeEventListener("visibilitychange", apply);
		};
	}, []);
}
