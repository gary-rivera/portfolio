import React from "react";
import { Flex, Card, Em, HStack, Heading, Box, Icon, GridItem, Grid, useRecipe, Text } from "@chakra-ui/react";
import { LuTarget } from "react-icons/lu";
import { CareerEvent, events } from "@/data/experience";

//TODO: move to MeasureDistance.ts
type Distance = {
	distance: number | null;
	horizontalDistance: number | null;
	verticalDistance: number | null;
};

type TimelineItemProps = {
	event: CareerEvent;
	index: number;
	alternate: boolean;
	iconRef: React.RefObject<HTMLDivElement>;
	distances: ({
		distance: number | null;
		horizontalDistance: number | null;
		verticalDistance: number | null;
	} | null)[];
};

type ImpactEventCardProps = {
	event: CareerEvent;
};
// TODO: just pass the whole damn object instead.
// TODO: bind the alternating card layout to a state?
// TODO: card title doesn't center if its only one present
// TODO: add hover tooltip to events where employer is listed giving a quick blurb about what service they offered +/- badges
// TODO: fix the elevated LCP (850ms) from description block
const TimelineEventCard: React.FC<ImpactEventCardProps> = ({ event }) => {
	const { title, description, date, origin, attributes, category } = event;
	const recipe = useRecipe({ key: "eventCard" });
	const styles = recipe({ category });
	console.log({ styles });
	return (
		<Flex css={styles} direction="column" justifyContent="center" py="3" px="5">
			<HStack>
				<Heading size="md">{title}</Heading>
				<Text fontSize="xs">{category}</Text>
			</HStack>
			<HStack>
				<Text fontSize="xs">{description}</Text>
			</HStack>
		</Flex>
	);
};
const TimelineEventDate: React.FC<{ date: string }> = ({ date }) => (
	<Box width="fit-content" color="black" w="auto">
		<Em fontSize="2xs" width="fit-content" color="gray.600">
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

	const TimelineConnector = () => (
		<Box
			position="absolute"
			top="100%"
			width="1.5px"
			height={`${distanceToNextTimelineIcon - 20}px`}
			bg="blackAlpha.500"
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
			<Icon fontSize="20px" zIndex={1} color="#0891b2">
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
				<TimelineEventCard event={event} />
			</GridItem>
		</>
	);

	const EventDateRightAlignedLayout = (
		<>
			<GridItem h="110%">
				<TimelineEventCard event={event} />
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
			gap={2}
			position="relative"
			templateColumns="1fr auto 1fr"
			templateRows="1fr"
			gridAutoFlow="row"
			gridAutoColumns="auto"
			alignItems="center"
			justifyContent="center"
			py="2"
			// w="100%"
			h="110%"
			my="-1.5"
		>
			{alternate ? EventDateRightAlignedLayout : EventDateLeftAlignedLayout}
		</Grid>
	);
}

export default TimelineItem;
