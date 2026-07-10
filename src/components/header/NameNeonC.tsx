import { useEffect, useState } from "react";
import "@styles/neon-c.css";

const ASCII_LINES = [
	` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█`,
	` ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`,
];

/**
 * NameNeonC — Synthwave gradient neon variant.
 * Hot-pink → magenta → violet → orange-pink gradient through the strokes,
 * soft fat bloom, faint horizon line under the name. Miami sunset warming
 * up the cold green CRT.
 *
 * Power-on sequence (no typewriter — too industrial for this vibe):
 *   1. horizon seam glows  (sun coming up)
 *   2. grid bars sweep outward
 *   3. letters ignite bottom-up (orange-peach → magenta → hot pink)
 *   4. bloom layers expand outward in waves
 *   5. settles into the existing slow breathing animation
 */
export default function NameNeonC() {
	const [ignited, setIgnited] = useState(false);
	const [settled, setSettled] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		setReducedMotion(reduced);

		if (reduced) {
			setIgnited(true);
			setSettled(true);
			return;
		}

		// next frame so the CSS transition/keyframe sees the class flip
		const raf = window.requestAnimationFrame(() => setIgnited(true));
		// once the warm-up is over, hand off to the steady-state breathing loop
		const settleId = window.setTimeout(() => setSettled(true), 2800);

		return () => {
			window.cancelAnimationFrame(raf);
			window.clearTimeout(settleId);
		};
	}, []);

	const artClass = [
		"neon-c__art",
		"text-[10px] sm:text-xs md:text-sm lg:text-base",
		ignited ? "is-ignited" : "",
		settled && !reducedMotion ? "neon-c__art--breathing" : "",
	]
		.filter(Boolean)
		.join(" ");

	const rootClass = [
		"neon-c m-0",
		ignited ? "is-ignited" : "",
		settled ? "is-settled" : "",
		reducedMotion ? "is-reduced" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<h1 className={rootClass}>
			<span className="sr-only">Gary Rivera</span>

			{/* ambient sunset halo sitting behind the sign */}
			<span aria-hidden="true" className="neon-c__halo" />

			<pre aria-hidden="true" className={artClass}>
				{ASCII_LINES.map((line, idx) => (
					<span key={idx} className="block">
						{line}
					</span>
				))}
			</pre>

			{/* faint synthwave horizon under the name */}
			<span aria-hidden="true" className="neon-c__horizon" />
		</h1>
	);
}
