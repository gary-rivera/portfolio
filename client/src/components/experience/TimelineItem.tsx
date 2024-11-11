import React from "react";
import { Flex, Card, Em, Box, Icon, GridItem, Grid } from "@chakra-ui/react";
import { LuTarget } from "react-icons/lu";
import { Event, events } from "@/data/experience";

//TODO: move to MeasureDistance.ts
type Distance = {
	distance: number | null;
	horizontalDistance: number | null;
	verticalDistance: number | null;
};

type TimelineItemProps = {
	event: Event;
	index: number;
	alternate: boolean;
	iconRef: React.RefObject<HTMLDivElement>;
	distances: ({
		distance: number | null;
		horizontalDistance: number | null;
		verticalDistance: number | null;
	} | null)[];
};

const TimelineEventCard: React.FC<{ description: string }> = ({ description }) => (
	<Card.Root w="auto" bg="rgba(0, 0, 0, 0.035)" h="100%" borderColor="rgba(12,92, 114, 0.2)">
		<Card.Body>
			<Card.Title>Event Title</Card.Title>
			<Card.Description>{description}</Card.Description>
		</Card.Body>
	</Card.Root>
);

const TimelineEventDate: React.FC<{ date: string }> = ({ date }) => (
	<Box width="fit-content" color="black" w="auto">
		<Em width="fit-content" color="gray.600">
			{date}
		</Em>
	</Box>
);

const TimelinePath: React.FC<{
	index: number;
	iconRef: React.RefObject<HTMLDivElement>;
	distances: (Distance | null)[];
}> = ({ iconRef, index, distances }) => {
	const distanceToNextTimelineIcon = distances[index]?.distance || 0;
	const isLast = index === events.length - 1;
	// don't delete (needed for possible debugging rn)
	console.log({
		distances,
		distanceToNextTimelineIcon,
		isLast,
		index,
		iconRef,
	});

	const TimelineConnector = () => (
		<Box
			position="absolute"
			top="100%"
			width="3px"
			height={`${distanceToNextTimelineIcon - 20}px`}
			backgroundColor="orange.400"
			overflow="hidden"
			zIndex={0}
		/>
	);

	return (
		<Flex
			position="relative"
			width="auto"
			// height="100px"
			alignItems="center"
			justifyContent="center"
			ref={iconRef}
		>
			<Icon fontSize="20px" zIndex={1} color="rgba(8, 145, 178)">
				{/* <VscCircleLargeFilled opacity="0.8" /> */}
				<LuTarget opacity="0.8" />
			</Icon>
			{!isLast && <TimelineConnector />}
		</Flex>
	);
};

function TimelineItem({ event, index, alternate, iconRef, distances }: TimelineItemProps) {
	const EventDateLeftAlignedLayout = (
		<>
			<GridItem width="auto" height="fit-content" justifySelf="end">
				<TimelineEventDate date={event.date} />
			</GridItem>
			<GridItem placeSelf="center">
				<TimelinePath iconRef={iconRef} index={index} distances={distances} />
			</GridItem>
			<GridItem h="115%">
				<TimelineEventCard description={event.description} />
			</GridItem>
		</>
	);

	const EventDateRightAlignedLayout = (
		<>
			<GridItem h="115%">
				<TimelineEventCard description={event.description} />
			</GridItem>
			<GridItem placeSelf="center">
				<TimelinePath iconRef={iconRef} index={index} distances={distances} />
			</GridItem>
			<GridItem width="auto" height="fit-content" justifySelf="start">
				<TimelineEventDate date={event.date} />
			</GridItem>
		</>
	);

	return (
		<Grid
			gap={3}
			position="relative"
			templateColumns="1fr auto 1fr"
			templateRows="1fr"
			gridAutoFlow="row"
			gridAutoColumns="auto"
			alignItems="center"
			justifyContent="center"
			w="100%"
		>
			{alternate ? EventDateRightAlignedLayout : EventDateLeftAlignedLayout}
		</Grid>
	);
}

export default TimelineItem;
