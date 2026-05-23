import { useEffect, useState } from "react";

export type Verbosity = "quiet" | "normal" | "verbose";

const STORAGE_KEY = "verbosity";

function readStored(): Verbosity {
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === "quiet" || v === "verbose") return v;
	} catch {}
	return "normal";
}

export function useVerbosity(): [Verbosity, (next: Verbosity) => void] {
	const [v, setV] = useState<Verbosity>(readStored);

	useEffect(() => {
		document.documentElement.setAttribute("data-verbosity", v);
		try {
			localStorage.setItem(STORAGE_KEY, v);
		} catch {}
	}, [v]);

	return [v, setV];
}
