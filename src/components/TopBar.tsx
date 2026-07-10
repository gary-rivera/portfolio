import { useEffect, useState } from "react";
import ContactBar from "./contact/ContactBar";

function formatTime(date: Date, timeZone?: string) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZoneName: "short",
		...(timeZone ? { timeZone } : {}),
	}).format(date);
}

function useNow(intervalMs = 1000) {
	const [now, setNow] = useState(() => new Date());
	useEffect(() => {
		const id = window.setInterval(() => setNow(new Date()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}

export default function TopBar() {
	const now = useNow();
	const localTime = formatTime(now);

	return (
		<nav className="mb-18 flex flex-wrap items-center justify-between gap-y-2 border-b border-dashed border-rule pb-2 text-xs tracking-wider text-text-muted lowercase">
			<ContactBar />
			<div className="flex flex-wrap items-center gap-x-5 gap-y-1">
				<span className="flex items-center gap-2 text-text-subtle" aria-label="local times">
					<span>
						<span className="text-text-subtle">local </span>
						<span className="neon-text">{localTime}</span>
					</span>
				</span>
			</div>
		</nav>
	);
}
