import { useEffect, useState } from "react";
import "../../styles/neon-b.css";

/**
 * NameNeonB — COLD CYBERPUNK CHROMATIC NEON variant.
 *
 * Dual-tone: line 1 electric cyan, line 2 hot magenta. Both lines carry
 * a red/blue chromatic-aberration ghost offset on every glyph, a sharp
 * white tube core, and heavy saturated bloom. A specular streak drifts
 * across like a neon reflection on wet asphalt; a scanline overlay is
 * confined to the sign's bounding box.
 *
 * Boot sequence (~1.3s) — malfunctioning holographic sign powering on:
 *   stage 0 "off"      — invisible, pre-mount
 *   stage 1 "scan"     — burst of horizontal scan-collapse slices
 *   stage 2 "split"    — chromatic split blown way apart, snaps inward
 *   stage 3 "phase"    — cyan locks; magenta still out of phase / stuttering
 *   stage 4 "overshoot"— RGB channel ghosts skew sideways, then settle
 *   stage 5 "lock"     — strobe flash, hard lock to steady state
 *   stage 6 "steady"   — normal flicker / specular drift
 *   stage 7 "desync"   — rare one-off desync ~6–9s after lock, then back to steady
 *
 * All motion is gated by prefers-reduced-motion.
 */

const ASCII_LINES = [
	` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█`,
	` ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`,
];

type Stage = "off" | "scan" | "split" | "phase" | "overshoot" | "lock" | "steady" | "desync";

// per-stage timing (ms). asymmetric — feels like the sign is fighting itself.
const TIMING: Record<Exclude<Stage, "off" | "steady" | "desync">, number> = {
	scan: 180,
	split: 200,
	phase: 340,
	overshoot: 330,
	lock: 250,
};

export default function NameNeonB() {
	const [stage, setStage] = useState<Stage>("off");

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			setStage("steady");
			return;
		}

		const timeouts: number[] = [];
		const schedule = (s: Stage, delay: number) => {
			timeouts.push(window.setTimeout(() => setStage(s), delay));
		};

		// boot sequence
		let t = 0;
		schedule("scan", t);
		t += TIMING.scan;
		schedule("split", t);
		t += TIMING.split;
		schedule("phase", t);
		t += TIMING.phase;
		schedule("overshoot", t);
		t += TIMING.overshoot;
		schedule("lock", t);
		t += TIMING.lock;
		schedule("steady", t);

		// rare one-off desync ~6–9s after settle — sign briefly loses its grip
		const desyncDelay = t + 6000 + Math.random() * 3000;
		timeouts.push(
			window.setTimeout(() => {
				setStage("desync");
				timeouts.push(window.setTimeout(() => setStage("steady"), 420));
			}, desyncDelay),
		);

		return () => {
			timeouts.forEach((id) => window.clearTimeout(id));
		};
	}, []);

	return (
		<h1 className="neon-b m-0" data-stage={stage}>
			<span className="sr-only">Gary Rivera</span>
			<pre
				aria-hidden="true"
				className="m-0 whitespace-pre font-medium leading-none tracking-tight text-[10px] sm:text-xs md:text-sm lg:text-base"
			>
				{ASCII_LINES.map((line, idx) => (
					<span
						key={idx}
						className={`neon-b-line ${idx === 0 ? "neon-b-line-1" : "neon-b-line-2"} block`}
					>
						{line}
					</span>
				))}
			</pre>
			{/* scan-collapse slices — only visible during boot stages */}
			<span className="neon-b-scan" aria-hidden="true">
				<span className="neon-b-scan-slice" />
				<span className="neon-b-scan-slice" />
				<span className="neon-b-scan-slice" />
				<span className="neon-b-scan-slice" />
			</span>
			{/* lock-in strobe flash */}
			<span className="neon-b-strobe" aria-hidden="true" />
			{/* drifting specular highlight — sits above text via mix-blend-mode: screen */}
			<span className="neon-b-specular" aria-hidden="true" />
		</h1>
	);
}
