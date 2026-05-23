import { useEffect, useRef, useState } from "react";
import { CONTACT_LINKS } from "@data/contact";
import ContactLink from "./ContactLink";
import Monogram from "@components/Monogram";

export default function StickyContact() {
	const [visible, setVisible] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

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

	return (
		<aside
			aria-hidden={!visible}
			className={`panel-shadow fixed top-1/2 z-[5] hidden w-[200px] -translate-y-1/2 border-y border-r border-dashed border-phosphor-dim bg-bg/[78%] px-4 pb-4 pt-[0.85rem] font-mono text-xs text-text-muted backdrop-blur-md transition-[opacity,transform] duration-[380ms,420ms] ease-out lg:block motion-reduce:transition-opacity motion-reduce:duration-200 ${
				visible
					? "translate-x-0 pointer-events-auto opacity-100"
					: "translate-x-3 pointer-events-none opacity-0"
			}`}
			style={{ right: "max(1.5rem, calc((100vw - 1080px) / 2 + 1.5rem))" }}
		>
			<div className="absolute -top-3 -left-px bg-bg px-2 text-2xs tracking-wider text-phosphor">
				<span className="text-phosphor-dim">~ </span>contact.bind
			</div>

			<div className="mb-[0.65rem] flex justify-end border-b border-dashed border-rule pb-[0.6rem]">
				<Monogram size="xs" />
			</div>

			<dl className="grid gap-[0.55rem]">
				{CONTACT_LINKS.map(({ k, v, href }) => (
					<div key={k}>
						<dt className="mb-[0.05rem] text-2xs tracking-wider text-text-subtle">{k}</dt>
						<dd className="text-sm">
							<ContactLink href={href}>{v}</ContactLink>
						</dd>
					</div>
				))}
			</dl>

			<div className="mt-[0.85rem] flex items-center gap-2 border-t border-dashed border-rule pt-[0.65rem] text-2xs tracking-wider text-text-subtle">
				<div className="animate-pulse-phosphor dot-glow h-1.5 w-1.5 rounded-full bg-phosphor" />
				<span>open to work</span>
			</div>
		</aside>
	);
}
