import { Fragment } from "react";
import Name from "./NameTypingEffect";

type MetaEntry = { k: string; v: string; note?: string; accent?: boolean };
type ContactEntry = { k: string; v: string; href: string };

const META: MetaEntry[] = [
	{ k: "handle", v: "gary-rivera", accent: true },
	{ k: "location", v: "40.6782°N · 73.9442°W", note: "// brooklyn, ny" },
	{ k: "last_commit", v: "2h ago", note: "// portfolio · main · 4f3a2c1" },
	{ k: "status", v: "● open", accent: true, note: "// senior backend / platform" },
	{ k: "uptime", v: "5y 84d", note: "// since rithm school graduation" },
];

const CONTACT: ContactEntry[] = [
	{ k: "email", v: "gary@…", href: "mailto:a.gary.rivera@gmail.com" },
	{ k: "github", v: "gary-rivera", href: "https://github.com/gary-rivera" },
	{ k: "linkedin", v: "gary-a-rivera", href: "https://www.linkedin.com/in/gary-a-rivera/" },
	{ k: "cv", v: "resume.pdf", href: "#resume" },
];

function MainHeader() {
	return (
		<header className="flex flex-col gap-6 pt-6 sm:pt-12">
			<Name />

			<dl className="mt-2 grid grid-cols-[140px_1fr] gap-x-6 gap-y-[0.4rem] text-[13px]">
				{META.map(({ k, v, note, accent }) => (
					<Fragment key={k}>
						<dt className="text-text-subtle">{k}</dt>
						<dd className="text-text">
							<span className={accent ? "text-phosphor" : "text-text"}>{v}</span>
							{note && <span className="ml-2 text-text-subtle"> {note}</span>}
						</dd>
					</Fragment>
				))}
			</dl>

			<p className="max-w-[70ch] text-[13.5px] leading-relaxed text-text-muted">
				<span className="text-text">engineer.</span> bootcamp-to-senior arc, three years on the
				backend at a fintech that got acquired. shipped infra nobody throws launch parties for.
				off-hours: <span className="text-text">i solder mechanical keyboards</span>. ask me about
				either.
			</p>

			<div
				id="contact-header"
				className="grid grid-cols-2 gap-x-8 gap-y-5 border-y border-dashed border-rule py-3 text-[12px] sm:grid-cols-[repeat(4,max-content)]"
			>
				{CONTACT.map(({ k, v, href }) => (
					<div key={k} className="flex flex-col gap-[0.15rem]">
						<span className="text-[10px] tracking-wider text-text-subtle">{k}</span>
						<a
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="text-[13px] text-text transition-colors duration-150 ease-out hover:text-phosphor"
						>
							{v}
						</a>
					</div>
				))}
			</div>
		</header>
	);
}

export default MainHeader;
