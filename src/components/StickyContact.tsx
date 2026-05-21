import { useEffect, useRef, useState } from "react";

const ITEMS = [
	{ k: "email", v: "gary@…", href: "mailto:a.gary.rivera@gmail.com" },
	{ k: "github", v: "gary-rivera", href: "https://github.com/gary-rivera" },
	{ k: "linkedin", v: "gary-a-rivera", href: "https://www.linkedin.com/in/gary-a-rivera/" },
	{ k: "cv", v: "resume.pdf", href: "#resume" },
] as const;

function StickyContact() {
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
			className="fixed top-1/2 z-[5] hidden w-[200px] border-y border-r border-dashed border-phosphor-dim bg-[rgba(15,19,16,0.78)] px-4 pb-4 pt-[0.85rem] font-mono text-[11px] text-text-muted backdrop-blur-md transition-[opacity,transform] duration-[380ms,420ms] ease-out lg:block motion-reduce:transition-opacity motion-reduce:duration-200"
			style={{
				right: "max(1.5rem, calc((100vw - 1080px) / 2 + 1.5rem))",
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? "auto" : "none",
				transform: visible
					? "translateY(-50%) translateX(0)"
					: "translateY(-50%) translateX(12px)",
				boxShadow: "0 0 0 1px rgba(15, 19, 16, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)",
			}}
		>
			<div className="absolute -top-3 -left-px bg-bg px-2 text-[10px] tracking-wider text-phosphor">
				<span className="text-phosphor-dim">~ </span>contact.bind
			</div>

			<dl className="grid gap-[0.55rem]">
				{ITEMS.map(({ k, v, href }) => (
					<div key={k}>
						<dt className="mb-[0.05rem] text-[10px] tracking-wider text-text-subtle">{k}</dt>
						<dd className="text-[12px]">
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
								className="border-b border-dotted border-transparent pb-px text-text transition-[color,border-color] duration-150 ease-out hover:border-phosphor-dim hover:text-phosphor"
							>
								{v}
							</a>
						</dd>
					</div>
				))}
			</dl>

			<div className="mt-[0.85rem] flex items-center gap-2 border-t border-dashed border-rule pt-[0.65rem] text-[10px] tracking-wider text-text-subtle">
				<div
					className="animate-pulse-phosphor h-1.5 w-1.5 rounded-full bg-phosphor"
					style={{ boxShadow: "0 0 6px var(--phosphor)" }}
				/>
				<span>online · open to work</span>
			</div>
		</aside>
	);
}

export default StickyContact;
