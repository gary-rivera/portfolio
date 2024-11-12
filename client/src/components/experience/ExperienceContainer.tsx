import { useRef } from "react";
import { useResumeRepo } from "../../hooks/useGitHub";
import { useDistanceBetweenElements } from "@/hooks/useDistanceBetweenElements.ts";
import { Text, Em, Box, VStack, Card } from "@chakra-ui/react";
import TimelineItem from "./TimelineItem";
import { events } from "@/data/experience";
import { Distance } from "@/hooks/useDistanceBetweenElements.ts";

function ExperienceContainer() {
	const { readmeContent, isLoading, isError } = useResumeRepo();

	const iconRefs = events.map(() => useRef<HTMLDivElement>(null));
	const distances: (Distance | null)[] = iconRefs.map((ref, index) => {
		if (index < iconRefs.length - 1) {
			return useDistanceBetweenElements(ref, iconRefs[index + 1]);
		}
		return null;
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;

	return (
		<VStack gap={0} position="relative" py="2rem" style={{ overflowY: "auto", maxHeight: "600px" }}>
			{/* {distances.map((distanceObj, index) =>
				distanceObj ? (
					<Box key={index}>
						<p>
							Distance between icons {index} and {index + 1}: {distanceObj.distance?.toFixed(2)}px
						</p>
					</Box>
				) : null,
			)}
					<Text>
						Total events: <Em fontStyle="bold">{events.length}</Em>
					</Text> */}
			{events.map((event, index) => {
				const alternate = !!(index % 2); // for alternating the card and date positioning

				return (
					<TimelineItem
						key={index}
						index={index}
						event={event}
						alternate={alternate}
						iconRef={iconRefs[index]}
						distances={distances}
					/>
				);
			})}
		</VStack>
	);
}

export default ExperienceContainer;
