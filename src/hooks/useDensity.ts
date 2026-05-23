import { useEffect, useState } from "react";

export type Density = "minimal" | "normal";

const STORAGE_KEY = "density";

function readStored(): Density {
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === "minimal") return v;
	} catch {}
	return "normal";
}

export function useDensity(): [Density, (next: Density) => void] {
	const [d, setD] = useState<Density>(readStored);

	useEffect(() => {
		document.documentElement.setAttribute("data-density", d);
		try {
			localStorage.setItem(STORAGE_KEY, d);
		} catch {}
	}, [d]);

	return [d, setD];
}
