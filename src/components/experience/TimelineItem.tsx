import { forwardRef } from "react";
import { Box, chakra, Flex } from "@chakra-ui/react";
import { CareerEvent } from "@/data/experience";

type TimelineItemProps = {
	event: CareerEvent;
	index: number;
};

type Level = "IMPACT" | "HIRED" | "PROMO" | "GRAD" | "INFO";

const MONTHS: Record<string, string> = {
	jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
	jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

const LEVEL_COLOR: Record<Level, string> = {
	IMPACT: "warn",
	HIRED: "phosphor",
	PROMO: "phosphor",
	GRAD: "phosphor",
	INFO: "phosphorDim",
};

function classifyLevel(event: CareerEvent): Level {
	const title = event.event.toLowerCase();
	if (title.includes("hired")) return "HIRED";
	if (title.includes("schooling") || title.includes("completed")) return "GRAD";
	if (title.includes("senior") || title.includes("promotion")) return "PROMO";
	if (event.category === "impact") return "IMPACT";
	return "INFO";
}

/** Parse the start of a date range like "Feb 2024 → Sep 2024" into an ISO-ish timestamp. */
function toIsoTs(date: string, index: number): { ts: string; range?: string } {
	const start = date.split("→")[0].trim();
	const end = date.includes("→") ? date.split("→")[1].trim() : undefined;
	const m = start.match(/(\w+)\s+(\d{4})/);
	if (!m) return { ts: start };
	const mon = MONTHS[m[1].toLowerCase().slice(0, 3)] || "01";
	const day = String(((index * 7 + 3) % 27) + 1).padStart(2, "0");
	const ts = `${m[2]}-${mon}-${day}T00:00Z`;
	const range = end
		? `${m[2]}-${mon} → ${end
				.match(/(\w+)\s+(\d{4})/)
				?.slice(1)
				.reverse()
				.map((s, i) => (i === 1 ? MONTHS[s.toLowerCase().slice(0, 3)] || "01" : s))
				.join("-") ?? end}`
		: undefined;
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
		<Flex
			ref={ref}
			role="group"
			display="grid"
			gridTemplateColumns={["1fr", "180px 90px 1fr auto"]}
			gap={["0.25rem", "1rem"]}
			px="0.7rem"
			py="0.45rem"
			borderLeft="2px solid transparent"
			transition="background 120ms var(--ease-out), border-color 120ms var(--ease-out)"
			_hover={{ bg: "rgba(123, 192, 137, 0.045)", borderColor: "phosphorDim" }}
		>
			<Box color="textSubtle" fontSize="12px" letterSpacing="-0.005em">
				{ts}
			</Box>
			<Box color={LEVEL_COLOR[level]} fontSize="11px" letterSpacing="0.06em" alignSelf={["start", "baseline"]}>
				[{level.padEnd(6, " ")}]
			</Box>
			<Box color="text" fontSize="13px" minW="0">
				{company && (
					<>
						<chakra.span color="phosphor">{company}:</chakra.span>{" "}
					</>
				)}
				<chakra.span>{msgPrimary.toLowerCase()}</chakra.span>
				{msgDesc && (
					<chakra.span color="textMuted">
						{" "}— {msgDesc.toLowerCase()}
					</chakra.span>
				)}
				{range && (
					<chakra.span color="textMuted">
						{" "}
						<chakra.span color="textSubtle">// {range}</chakra.span>
					</chakra.span>
				)}
			</Box>
			<Box color="textSubtle" fontSize="11px" justifySelf={["start", "end"]}>
				{id}
			</Box>
		</Flex>
	);
});

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
