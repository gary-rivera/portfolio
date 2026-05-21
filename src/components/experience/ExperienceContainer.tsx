import { Flex } from "@chakra-ui/react";
import SectionHead from "@/components/SectionHead";
import TimelineItem from "./TimelineItem";
import { events } from "@/data/experience";

function ExperienceContainer() {
	return (
		<section>
			<SectionHead name="work.log" meta={`tail -n ${events.length} · 2021—2024 · sorted desc`} />
			<Flex direction="column" w="100%" mx={["-0.7rem", "-0.7rem"]}>
				{events.map((event, index) => (
					<TimelineItem key={`timeline-${index}`} event={event} index={index} />
				))}
			</Flex>
		</section>
	);
}

export default ExperienceContainer;
