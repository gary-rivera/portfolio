import { useEffect, useRef, useState } from "react";
import "@styles/neon-phosphor.css";

const ASCII_LINES = [
	` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█`,
	` ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`,
];

type Flick = "on" | "soft" | "mid" | "deep" | "off" | "surge";

type Event = { state: Flick; ms: number };

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** weighted random pick of the next flicker event sequence.
 *  events step through multiple intermediate depths so the eye sees
 *  the tube *struggling* between levels, not snapping on/off. */
function pickEvent(): Event[] {
	const r = Math.random();

	if (r < 0.22) {
		// gentle dip: on → soft → on
		return [{ state: "soft", ms: rand(50, 90) }];
	}
	if (r < 0.42) {
		// mid flicker: on → mid → soft → on
		return [
			{ state: "mid", ms: rand(25, 50) },
			{ state: "soft", ms: rand(35, 65) },
		];
	}
	if (r < 0.6) {
		// hard blink with rebound: off → deep → on
		return [
			{ state: "off", ms: rand(15, 35) },
			{ state: "deep", ms: rand(15, 35) },
		];
	}
	if (r < 0.74) {
		// cascade fade through all depths and back — quick sweep
		return [
			{ state: "soft", ms: rand(25, 45) },
			{ state: "mid", ms: rand(20, 40) },
			{ state: "deep", ms: rand(20, 40) },
			{ state: "off", ms: rand(15, 30) },
			{ state: "deep", ms: rand(15, 30) },
			{ state: "mid", ms: rand(20, 40) },
			{ state: "soft", ms: rand(30, 55) },
		];
	}
	if (r < 0.86) {
		// deep struggle — tube nearly dies, brief darkness then recovers
		return [
			{ state: "mid", ms: rand(25, 50) },
			{ state: "deep", ms: rand(35, 70) },
			{ state: "off", ms: rand(20, 45) },
			{ state: "deep", ms: rand(20, 40) },
			{ state: "mid", ms: rand(25, 45) },
			{ state: "soft", ms: rand(35, 60) },
		];
	}
	if (r < 0.95) {
		// rapid stutter — alternating depths, all quick
		const n = 3 + Math.floor(Math.random() * 3); // 3–5
		const depths: Flick[] = ["off", "deep", "mid"];
		const out: Event[] = [];
		for (let i = 0; i < n; i += 1) {
			out.push({ state: depths[i % depths.length], ms: rand(18, 38) });
			if (i < n - 1) out.push({ state: "soft", ms: rand(25, 45) });
		}
		return out;
	}
	// rare: drop then re-strike surge with overshoot — even this is snappy
	return [
		{ state: "off", ms: rand(80, 160) },
		{ state: "deep", ms: rand(25, 50) },
		{ state: "mid", ms: rand(20, 40) },
		{ state: "surge", ms: rand(90, 150) },
		{ state: "soft", ms: rand(50, 90) },
	];
}

/** gap between flicker events — mostly 1.2–4.8s, occasional 6.5–11s
 *  lull so the pattern reads as sporadic, not mechanical. */
function nextGapMs() {
	if (Math.random() < 0.14) return rand(6500, 11000);
	return rand(1200, 4800);
}

export default function NameNeonPhosphor() {
	const [phase, setPhase] = useState<"boot" | "lit">("boot");
	const [flick, setFlick] = useState<Flick>("on");
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			setPhase("lit");
			return;
		}
		const bootDone = window.setTimeout(() => setPhase("lit"), 320);
		return () => window.clearTimeout(bootDone);
	}, []);

	useEffect(() => {
		if (phase !== "lit") return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;

		let cancelled = false;

		function runSequence(seq: Event[], idx: number) {
			if (cancelled) return;
			if (idx >= seq.length) {
				setFlick("on");
				schedule();
				return;
			}
			const ev = seq[idx];
			setFlick(ev.state);
			timerRef.current = window.setTimeout(() => runSequence(seq, idx + 1), ev.ms);
		}

		function schedule() {
			timerRef.current = window.setTimeout(() => {
				if (cancelled) return;
				runSequence(pickEvent(), 0);
			}, nextGapMs());
		}

		schedule();

		return () => {
			cancelled = true;
			if (timerRef.current) window.clearTimeout(timerRef.current);
		};
	}, [phase]);

	return (
		<h1 className="m-0">
			<span className="sr-only">Gary Rivera</span>
			<span className="neon-phos" data-phase={phase}>
				<span className="neon-phos__halo" aria-hidden="true" />
				<pre
					aria-hidden="true"
					data-flick={flick}
					className="neon-phos__art m-0 whitespace-pre font-medium leading-none tracking-tight text-[clamp(9px,2.55vw,23px)]"
				>
					{ASCII_LINES.map((line, idx) => (
						<span key={idx} className="block">
							{line}
						</span>
					))}
				</pre>
			</span>
		</h1>
	);
}
