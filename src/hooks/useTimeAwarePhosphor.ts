import { useEffect } from "react";

// Two anchors blended sinusoidally across the day.
// Peaks at noon (pure green) and midnight (pure teal); smooth interpolation between.
// Computed once on mount — no ticking. Quiet easter egg: each visit picks up the current hue.
const HUE_GREEN = 145;
const HUE_TEAL = 188;
const L = 0.76;
const C = 0.105;

function pickPhosphor(now: Date): string {
	const t = now.getHours() + now.getMinutes() / 60; // 0..24
	// 1 at noon, 0 at midnight, smooth cosine in between
	const factor = (Math.cos((2 * Math.PI * (t - 12)) / 24) + 1) / 2;
	const hue = HUE_GREEN * factor + HUE_TEAL * (1 - factor);
	return `oklch(${L} ${C} ${hue.toFixed(2)})`;
}

export function useTimeAwarePhosphor() {
	useEffect(() => {
		const root = document.documentElement;

		const apply = () => {
			const isLight = root.getAttribute("data-theme") === "light";
			if (isLight) {
				root.style.removeProperty("--color-phosphor");
				return;
			}
			root.style.setProperty("--color-phosphor", pickPhosphor(new Date()));
		};

		apply();

		const observer = new MutationObserver(apply);
		observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

		return () => {
			observer.disconnect();
			root.style.removeProperty("--color-phosphor");
		};
	}, []);
}
