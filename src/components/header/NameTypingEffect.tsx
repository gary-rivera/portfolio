import { useEffect, useState } from "react";

const ASCII_LINES = [
	` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█`,
	` ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`,
];
const LINE_LEN = ASCII_LINES[0].length;
const TYPE_SPEED_MS = 22;

export default function Name() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			setProgress(LINE_LEN);
			return;
		}
		let i = 0;
		const id = window.setInterval(() => {
			i += 1;
			setProgress(i);
			if (i >= LINE_LEN) window.clearInterval(id);
		}, TYPE_SPEED_MS);
		return () => window.clearInterval(id);
	}, []);

	const complete = progress >= LINE_LEN;

	return (
		<h1 className="glow-name m-0">
			<span className="sr-only">Gary Rivera</span>
			<pre
				aria-hidden="true"
				className="m-0 whitespace-pre font-medium leading-none tracking-tight text-phosphor text-[10px] sm:text-xs md:text-sm lg:text-base"
			>
				{ASCII_LINES.map((line, idx) => (
					<span key={idx} className="block">
						{line.slice(0, progress)}
						{!complete && idx === 0 && (
							<span className="animate-blink-phosphor">▋</span>
						)}
					</span>
				))}
			</pre>
		</h1>
	);
}
