import { useEffect, useState } from "react";
import "@styles/neon-a.css";

/**
 * NameNeonA — classic tube neon variant.
 *
 * The ASCII strokes are treated like bent glass with hot-pink gas inside:
 * white-hot core → tube-wall pink → atmospheric haze that bleeds onto the
 * page. A faint reflected sheen sits below the sign like a polished shelf.
 *
 * On mount the sign runs a neon-sign POWER-ON sequence — cold cathode glow,
 * a single sputter, asymmetric partial ignition, a bright ionization surge,
 * then it settles into its irregular steady-state flicker. ~3-6s later there
 * is a small chance of a one-shot "re-strike" flicker, as if one tube briefly
 * failed.
 *
 * Under `prefers-reduced-motion` we skip the whole warm-up and fade in.
 */

const ASCII_LINES = [
	` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█`,
	` ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`,
];

// power-on phase → ms duration. Hand-tuned to feel irregular, not metronomic.
type Phase =
	| "cold"     // gas just energized, no light yet
	| "sputter"  // one row tries to strike, dies back
	| "partial"  // row 1 hums dim, row 2 mostly dark, then partially catches
	| "surge"    // full ionization, brief over-bright
	| "settle"  // easing into normal
	| "steady"; // normal operation w/ existing flicker

const PHASE_TIMINGS: Record<Exclude<Phase, "steady">, number> = {
	cold: 180,
	sputter: 240,
	partial: 680,
	surge: 280,
	settle: 370,
};

export default function NameNeonA() {
	const [phase, setPhase] = useState<Phase>("cold");
	const [reduced, setReduced] = useState(false);
	const [restrike, setRestrike] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);

		if (mq.matches) {
			setPhase("steady");
			return;
		}

		const timeouts: number[] = [];
		const schedule = (fn: () => void, delay: number) => {
			timeouts.push(window.setTimeout(fn, delay));
		};

		let t = 0;
		schedule(() => setPhase("cold"), t);
		t += PHASE_TIMINGS.cold;
		schedule(() => setPhase("sputter"), t);
		t += PHASE_TIMINGS.sputter;
		schedule(() => setPhase("partial"), t);
		t += PHASE_TIMINGS.partial;
		schedule(() => setPhase("surge"), t);
		t += PHASE_TIMINGS.surge;
		schedule(() => setPhase("settle"), t);
		t += PHASE_TIMINGS.settle;
		schedule(() => setPhase("steady"), t);

		// one-shot re-strike: ~60% chance, fires somewhere between 3.0-6.0s
		// after the sign has settled. A single brief tube-fail flicker.
		const willRestrike = Math.random() < 0.6;
		if (willRestrike) {
			const restrikeDelay = t + 3000 + Math.random() * 3000;
			schedule(() => setRestrike(true), restrikeDelay);
			// CSS animation drives the visual; clear flag after it completes
			// so the class can be re-added on re-mount if needed.
			schedule(() => setRestrike(false), restrikeDelay + 900);
		}

		return () => {
			for (const id of timeouts) window.clearTimeout(id);
		};
	}, []);

	return (
		<h1
			className="neon-a m-0"
			data-flicker={reduced ? "off" : "on"}
			data-phase={phase}
			data-restrike={restrike ? "on" : "off"}
		>
			<span className="sr-only">Gary Rivera</span>
			<pre
				aria-hidden="true"
				className="neon-a-glass m-0 whitespace-pre font-medium leading-none tracking-tight text-[10px] sm:text-xs md:text-sm lg:text-base"
			>
				{ASCII_LINES.map((line, idx) => (
					<span
						key={idx}
						className="neon-a-row block"
						data-row={idx === 0 ? "top" : "bot"}
					>
						{line}
					</span>
				))}
			</pre>
		</h1>
	);
}
