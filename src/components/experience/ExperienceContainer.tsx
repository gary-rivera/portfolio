import SectionHead from "@components/SectionHead";
import TimelineItem from "./TimelineItem";
import { events } from "@data/experience";

export default function ExperienceContainer() {
	return (
		<section>
			<SectionHead name="work.log" meta={`tail -n ${events.length} · 2021—2024 · sorted desc`} />
			<div className="-mx-3 flex w-full flex-col">
				{events.map((event, index) => (
					<TimelineItem key={`timeline-${index}`} event={event} index={index} />
				))}
			</div>
		</section>
	);
}
