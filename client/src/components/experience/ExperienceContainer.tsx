import React, { useRef } from "react";
import { useResumeRepo } from "../../hooks/useGitHub";
import { useDistanceBetweenElements } from "@/hooks/useDistanceBetweenElements.ts";
import { Text, Em, Box, VStack, Card, Flex, Spacer } from "@chakra-ui/react";
import TimelineItem from "./TimelineItem";
import { events } from "@/data/experience";
import { Distance } from "@/hooks/useDistanceBetweenElements.ts";
import { halfWayLinesChakraStyle } from "@/utils/layoutHelper";

function ExperienceContainer() {
	// const { readmeContent, isLoading, isError } = useResumeRepo();

	const iconRefs = events.map(() => useRef<HTMLDivElement>(null));
	const distances: (Distance | null)[] = iconRefs.map((ref, index) => {
		if (index < iconRefs.length - 1) {
			return useDistanceBetweenElements(ref, iconRefs[index + 1]);
		}
		return null;
	});

	// if (isLoading) return <p>Loading...</p>;
	// if (isError) return <p>Error loading repository contents</p>;

	return (
		<Flex
			key="experience-container"
			direction="column"
			gap={0}
			position="relative"
			mt="0.75rem"
			minHeight="100%"
			overflowX="visible"
			// {...halfWayLinesChakraStyle}
		>
			{events.map((event, index) => {
				const alternate = !!(index % 2); // for alternating the card and date positioning

				return (
					<React.Fragment key={`timeline-item-fragment-${index}`}>
						<TimelineItem
							index={index}
							event={event}
							alternate={alternate}
							iconRef={iconRefs[index]}
							distances={distances}
						/>
						<Spacer />
					</React.Fragment>
				);
			})}
		</Flex>
	);
}

export default ExperienceContainer;
