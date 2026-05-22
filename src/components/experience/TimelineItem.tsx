import { forwardRef } from "react";
import { CareerEvent } from "@data/experience";

type TimelineItemProps = {
	event: CareerEvent;
	index: number;
};

type Level = "IMPACT" | "HIRED" | "PROMO" | "GRAD" | "INFO";

const MONTHS: Record<string, string> = {
	jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
	jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

const LEVEL_CLASS: Record<Level, string> = {
	IMPACT: "text-warn",
	HIRED: "text-phosphor",
	PROMO: "text-phosphor",
	GRAD: "text-phosphor",
	INFO: "text-phosphor-dim",
};

function classifyLevel(event: CareerEvent): Level {
	const title = event.event.toLowerCase();
	if (title.includes("hired")) return "HIRED";
	if (title.includes("schooling") || title.includes("completed")) return "GRAD";
	if (title.includes("senior") || title.includes("promotion")) return "PROMO";
	if (event.category === "impact") return "IMPACT";
	return "INFO";
}

function toIsoTs(date: string, index: number): { ts: string; range?: string } {
	const start = date.split("→")[0].trim();
	const end = date.includes("→") ? date.split("→")[1].trim() : undefined;
	const m = start.match(/(\w+)\s+(\d{4})/);
	if (!m) return { ts: start };
	const mon = MONTHS[m[1].toLowerCase().slice(0, 3)] || "01";
	const day = String(((index * 7 + 3) % 27) + 1).padStart(2, "0");
	const ts = `${m[2]}-${mon}-${day}T00:00Z`;
	if (!end) return { ts };
	const endMatch = end.match(/(\w+)\s+(\d{4})/);
	const range = endMatch
		? `${m[2]}-${mon} → ${endMatch[2]}-${MONTHS[endMatch[1].toLowerCase().slice(0, 3)] || "01"}`
		: `${m[2]}-${mon} → ${end}`;
	return { ts, range };
}

function shortId(text: string): string {
	let h = 0;
	for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
	return "#" + h.toString(16).padStart(6, "0").slice(0, 6);
}

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(({ event, index }, ref) => {
	const level = classifyLevel(event);
	const { ts, range } = toIsoTs(event.date, index);
	const id = shortId(event.event + event.date);
	const company = event.subtitle?.toLowerCase();
	const msgPrimary = event.event;
	const msgDesc = event.description;

	return (
		<div
			ref={ref}
			className="group grid grid-cols-1 gap-1 border-l-2 border-transparent px-3 py-[0.45rem] transition-[background,border-color] duration-100 ease-out hover:border-phosphor-dim hover:bg-phosphor/[4.5%] sm:grid-cols-[180px_90px_1fr_auto] sm:gap-4"
		>
			<div className="text-sm tracking-[-0.005em] text-text-subtle">{ts}</div>
			<div className={`${LEVEL_CLASS[level]} self-start text-xs tracking-wider sm:self-baseline`}>
				[{level.padEnd(6, " ")}]
			</div>
			<div className="min-w-0 text-base text-text">
				{company && <span className="text-phosphor">{company}: </span>}
				<span>{msgPrimary.toLowerCase()}</span>
				{msgDesc && <span className="text-text-muted"> — {msgDesc.toLowerCase()}</span>}
				{range && (
					<span className="text-text-muted">
						{" "}
						<span className="text-text-subtle">// {range}</span>
					</span>
				)}
			</div>
			<div className="justify-self-start text-xs text-text-subtle sm:justify-self-end">{id}</div>
		</div>
	);
});

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
