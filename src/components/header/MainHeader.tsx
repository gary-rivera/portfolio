import { Fragment } from "react";
import Name from "./NameTypingEffect";

type MetaEntry = { k: string; v: string; note?: string; accent?: boolean };

const META: MetaEntry[] = [
	{ k: "location", v: "40.6782°N · 73.9442°W", note: "// brooklyn, ny" },
	{ k: "last_commit", v: "2h ago", note: "// portfolio · main · 4f3a2c1" },
	{ k: "status", v: "● open", accent: true, note: "// senior backend / platform" },
	{ k: "uptime", v: "5y 84d", note: "// since rithm school graduation" },
];

export default function MainHeader() {
	return (
		<header className="flex flex-col gap-6 pt-6 sm:pt-12">
			<Name />

			<dl className="mt-2 grid grid-cols-[140px_1fr] gap-x-6 gap-y-[0.4rem] text-base">
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

		</header>
	);
}
