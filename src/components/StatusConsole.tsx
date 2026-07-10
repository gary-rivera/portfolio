import ConsoleCard, { type ConsoleEntry } from "./ConsoleCard";

const ENTRIES: ConsoleEntry[] = [
	{ k: "open_to", v: "frontend / fullstack", meta: "// sf, remote, or remote-w/-quarterly-onsites" },
	{ k: "shipping", v: "snaily v0.4", meta: "// gary-rivera/flappy-js" },
	{ k: "reading", v: "Designing Data-Intensive Applications", meta: "// what AI can't replace" },
];

export default function StatusConsole() {
	return (
		<ConsoleCard
			as="aside"
			title="status.live"
			meta={`// updated ${__REPO_LAST_PUSHED__}`}
			entries={ENTRIES}
			size="sm"
		/>
	);
}
