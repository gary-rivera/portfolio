import { useEffect, useRef, useState } from "react";
import { CONTACT_LINKS } from "@data/contact";
import ContactLink from "./ContactLink";
import Monogram from "@components/Monogram";
import "@styles/sticky-contact.css";

/**
 * StickyContact — "HANGING NEON OPEN SIGN"
 *
 * The floating contact panel is reframed as a glass-tube shop sign bolted to
 * the right wall: it hangs from two mounting screws by short straps, throws a
 * faint wall-stain bloom onto the page, and the hero is a buzzing amber "OPEN"
 * tube over a phosphor "TO WORK" tagline.
 *
 * When the sign first scrolls into play it runs a cold-cathode POWER-ON
 * (cold → sputter → surge → steady buzz), then settles into an irregular
 * gas-tube flicker. Under prefers-reduced-motion it simply fades in, fully lit.
 *
 * Visibility behavior is preserved 1:1 from the original StickyContact: an
 * IntersectionObserver on #contact-header, visible = !isIntersecting.
 */

type Phase = "idle" | "cold" | "sputter" | "surge" | "steady";

const POWER_TIMINGS: Record<Exclude<Phase, "idle" | "steady">, number> = {
	cold: 200,
	sputter: 240,
	surge: 340,
};

export default function StickyContact() {
	const [visible, setVisible] = useState(false);
	const [phase, setPhase] = useState<Phase>("idle");
	const [reduced, setReduced] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const poweredRef = useRef(false);

	// visibility observer — identical semantics to the original component
	useEffect(() => {
		const target = document.getElementById("contact-header");
		if (!target || typeof IntersectionObserver === "undefined") return;

		observerRef.current = new IntersectionObserver(
			([entry]) => {
				setVisible(!entry.isIntersecting);
			},
			{ threshold: 0, rootMargin: "0px 0px -40px 0px" },
		);
		observerRef.current.observe(target);

		return () => {
			observerRef.current?.disconnect();
		};
	}, []);

	// neon power-on: fires once, the first time the sign becomes visible
	useEffect(() => {
		if (!visible || poweredRef.current) return;
		poweredRef.current = true;

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		if (mq.matches) {
			setPhase("steady");
			return;
		}

		const timeouts: number[] = [];
		const at = (fn: () => void, delay: number) =>
			timeouts.push(window.setTimeout(fn, delay));

		let t = 0;
		at(() => setPhase("cold"), t);
		t += POWER_TIMINGS.cold;
		at(() => setPhase("sputter"), t);
		t += POWER_TIMINGS.sputter;
		at(() => setPhase("surge"), t);
		t += POWER_TIMINGS.surge;
		at(() => setPhase("steady"), t);

		return () => {
			for (const id of timeouts) window.clearTimeout(id);
		};
	}, [visible]);

	const lit = phase === "steady" && !reduced;

	return (
		<aside
			aria-hidden={!visible}
			data-phase={phase}
			data-flicker={lit ? "on" : "off"}
			className={`sticky-contact fixed top-1/2 z-[5] hidden w-[210px] -translate-y-1/2 font-mono text-xs text-text-muted transition-[opacity,transform] duration-[420ms,460ms] ease-out lg:block motion-reduce:transition-opacity motion-reduce:duration-200 ${
				visible
					? "translate-x-0 pointer-events-auto opacity-100"
					: "translate-x-3 pointer-events-none opacity-0"
			}`}
			style={{ right: "max(1.5rem, calc((100vw - 1080px) / 2 - 210px - 1.5rem))" }}
		>
			{/* mounting hardware — the sign hangs off two wall screws */}
			<div aria-hidden="true">
				<span className="sticky-contact-screw" data-side="l" />
				<span className="sticky-contact-screw" data-side="r" />
				<span className="sticky-contact-strap" data-side="l" />
				<span className="sticky-contact-strap" data-side="r" />
			</div>

			<div className="sticky-contact-pane relative bg-bg/[78%] px-4 pb-[0.9rem] pt-[1.05rem] backdrop-blur-md">
				{/* corner bolts */}
				<span className="sticky-contact-corner" data-c="tl" aria-hidden="true" />
				<span className="sticky-contact-corner" data-c="tr" aria-hidden="true" />
				<span className="sticky-contact-corner" data-c="bl" aria-hidden="true" />
				<span className="sticky-contact-corner" data-c="br" aria-hidden="true" />

				{/* label tab riding the top edge */}
				<div className="sticky-contact-tab absolute -top-[0.35rem] left-4 bg-bg px-[0.4rem] text-[0.6rem] tracking-[0.2em]">
					<span className="sticky-contact-tab-mark">~ </span>contact.me
				</div>

				{/* HERO — the illuminated OPEN sign */}
				<div className="mb-[0.7rem] flex flex-col items-center gap-[0.28rem] border-b border-dashed border-rule pb-[0.75rem]">
					<Monogram size="xs" className="opacity-90" />
					<span
						aria-hidden="true"
						className="sticky-contact-open mt-[0.15rem] font-bold leading-none tracking-[0.16em] text-[2.15rem]"
					>
						OPEN
					</span>
					<span className="sr-only">Open to work — get in touch</span>
					<span
						aria-hidden="true"
						className="sticky-contact-sub text-2xs font-semibold tracking-[0.42em] leading-none"
					>
						TO WORK
					</span>
				</div>

				{/* contact tubes */}
				<dl className="grid gap-[0.55rem]">
					{CONTACT_LINKS.map(({ k, v, href }) => (
						<div key={k}>
							<dt className="mb-[0.08rem] text-2xs tracking-[0.18em] text-text-subtle">
								{k}
							</dt>
							<dd className="text-sm">
								<ContactLink href={href} className="sticky-contact-link">
									{v}
								</ContactLink>
							</dd>
						</div>
					))}
				</dl>

				<div className="sticky-contact-rule mt-[0.85rem]" aria-hidden="true" />

				{/* footer — the transformer hum / on-air tell */}
				<div className="mh-geo mt-[0.7rem] flex items-center gap-2 text-2xs tracking-[0.18em] text-text-subtle">
					sf, ca · pdt
				</div>
			</div>
		</aside>
	);
}
