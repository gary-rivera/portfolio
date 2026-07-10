import SectionHead from "@components/SectionHead";
import CareerChapter, { OnRamp } from "./CareerChapter";
import { chapters, onRamp, totalSpan } from "@data/experience";
import "@styles/work-log.css";

export default function ExperienceContainer() {
	return (
		<section>
			<SectionHead name="work.history" meta={totalSpan()} />
			<ol aria-label="career history" className="flex w-full list-none flex-col p-0">
				{chapters.map((chapter, index) => (
					<CareerChapter key={chapter.id} chapter={chapter} last={index === chapters.length - 1} />
				))}
				<OnRamp tenure={onRamp.tenure} items={onRamp.items} />
			</ol>
		</section>
	);
}
