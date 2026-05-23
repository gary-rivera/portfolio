import { useEffect, useState } from "react";

const LOG_LINES = [
	{ tag: "OK", text: "mounted /dev/gary" },
	{ tag: "OK", text: "loaded brooklyn.geo (40.6782N, 73.9442W)" },
	{ tag: "OK", text: "started senior-backend.service since 2020-08" },
	{ tag: "OK", text: "keyboards.timer active (next: tonight)" },
	{ tag: "WARN", text: "coffee.service degraded" },
	{ tag: "OK", text: "resume staged" },
];

const SCAN_AT_MS = 100;
const LOG_START_MS = 280;
const PER_LINE_MS = 140;

export default function BootSequence() {
	const [phase, setPhase] = useState<"crt" | "log" | "exit" | "done">("crt");
	const [logProgress, setLogProgress] = useState(0);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			setPhase("done");
			return;
		}

		const timers: number[] = [];
		document.documentElement.classList.add("crt-boot");

		timers.push(
			window.setTimeout(() => {
				setPhase("log");
			}, LOG_START_MS),
		);

		LOG_LINES.forEach((_, i) => {
			timers.push(
				window.setTimeout(() => setLogProgress(i + 1), LOG_START_MS + PER_LINE_MS * (i + 1)),
			);
		});

		const totalMs = LOG_START_MS + PER_LINE_MS * (LOG_LINES.length + 1) + 280;
		timers.push(window.setTimeout(() => setPhase("exit"), totalMs));
		timers.push(window.setTimeout(() => setPhase("done"), totalMs + 320));

		const skip = () => {
			setPhase("exit");
			timers.forEach((t) => window.clearTimeout(t));
			window.setTimeout(() => setPhase("done"), 200);
		};
		window.addEventListener("keydown", skip, { once: true });
		window.addEventListener("pointerdown", skip, { once: true });

		return () => {
			timers.forEach((t) => window.clearTimeout(t));
			window.removeEventListener("keydown", skip);
			window.removeEventListener("pointerdown", skip);
			document.documentElement.classList.remove("crt-boot");
		};
	}, []);

	if (phase === "done") return null;

	return (
		<div
			role="presentation"
			aria-hidden="true"
			className={`fixed inset-0 z-[200] overflow-hidden bg-bg p-6 transition-opacity duration-300 ease-out sm:p-10 ${
				phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
			}`}
		>
			{phase !== "crt" && <div className="boot-sweep" style={{ animationDelay: `${SCAN_AT_MS}ms` }} />}

			<div className="max-w-[640px] font-mono text-xs leading-relaxed sm:text-sm">
				{LOG_LINES.slice(0, logProgress).map((line, i) => (
					<div key={i}>
						<span className={line.tag === "WARN" ? "text-warn" : "text-phosphor"}>
							[{line.tag.padEnd(4, " ")}]
						</span>{" "}
						<span className="text-text-muted">{line.text}</span>
					</div>
				))}
				{logProgress >= LOG_LINES.length && (
					<div className="mt-3">
						<span className="text-phosphor">gary@portfolio login:</span>{" "}
						<span className="animate-blink-phosphor text-phosphor">▋</span>
					</div>
				)}
			</div>

			<div className="absolute right-4 bottom-4 text-xs text-text-subtle">
				press any key to skip
			</div>
		</div>
	);
}
