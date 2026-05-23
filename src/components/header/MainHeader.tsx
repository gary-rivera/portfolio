import { Fragment } from "react";
import Name from "./NameTypingEffect";

type MetaEntry = { k: string; v: string; note?: string; accent?: boolean };

const GRADUATION = new Date(2020, 7, 4);

function diffYMD(from: Date, to: Date) {
	let years = to.getFullYear() - from.getFullYear();
	let months = to.getMonth() - from.getMonth();
	let days = to.getDate() - from.getDate();
	if (days < 0) {
		months -= 1;
		const prevMonthEnd = new Date(to.getFullYear(), to.getMonth(), 0);
		days += prevMonthEnd.getDate();
	}
	if (months < 0) {
		years -= 1;
		months += 12;
	}
	return { years, months, days };
}

function formatExperience(from: Date, to: Date) {
	const { years, months, days } = diffYMD(from, to);
	return `${years}y ${months}m ${days}d`;
}

export default function MainHeader() {
	const META: MetaEntry[] = [
		{ k: "location", v: "mission district, sf", note: "// 37.7599°N · 122.4148°W" },
		{ k: "last_commit", v: "2h ago", note: "// portfolio · 4f3a2c1" },
		{
			k: "experience",
			v: formatExperience(GRADUATION, new Date()),
			note: "// since rithm school graduation",
		},
	];

	return (
		<header className="flex flex-col gap-5 ">
			<Name />

			<div>
				<div className="text-base text-text sm:text-lg">
					<span className="text-phosphor">frontend &amp; fullstack engineer</span>
					<span className="text-text-subtle"> · </span>
					design &amp; interface craft
					<span className="text-text-subtle"> · </span>
					sf
				</div>
				<div className="mt-1 text-sm text-text-muted">
					design-leaning, taste-shaped.{" "}
					<span className="animate-blink-phosphor text-phosphor-dim">▋</span>
				</div>
			</div>

			<dl className="mt-1 grid grid-cols-[110px_1fr] gap-x-5 gap-y-[0.4rem] text-sm sm:grid-cols-[140px_1fr] sm:gap-x-6 sm:text-base">
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

			<p className="max-w-[68ch] text-sm leading-relaxed text-text-muted">
				<span className="text-text">engineer.</span> bootcamp-to-senior arc, three years on the
				backend at a fintech that got acquired. now front-of-stack — design and interface craft,
				where taste does the heavy lifting. off-hours:{" "}
				<span className="text-text">i solder mechanical keyboards</span>. ask me about either.
			</p>
		</header>
	);
}
