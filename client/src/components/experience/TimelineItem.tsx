import React from "react";
import { chakra, Flex, Em, HStack, Heading, Box, Icon, GridItem, Grid, useRecipe, Text } from "@chakra-ui/react";
import ActionableTextHighlight from "../ui/actionable-text-highlight";

import { CareerEvent, events } from "@/data/experience";
import { LuTarget } from "react-icons/lu";
import { HiAtSymbol } from "react-icons/hi";

import { FaExternalLinkAlt } from "react-icons/fa";

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

// TODO: bind the alternating card layout to a state? (possible fix for the items height not overlapping)
// TODO: add hover tooltip to events where employer is listed giving a quick blurb about what service they offered +/- badges
const TimelineEventCard: React.FC<ImpactEventCardProps> = ({ event }) => {
	const { title, subtitle, description, date, origin, attributes, category, icon: AvyIconnn } = event;
	const ExternalLinkIcon = chakra(FaExternalLinkAlt);

	const recipe = useRecipe({ key: "eventCard" });
	const styles = recipe({ category });
	return (
		<Flex css={styles} direction="column" justifyContent="center" py="3" px="5" fontSize="16px">
			<HStack fontSize="16px">
				{subtitle ? (
					<Heading fontWeight="semibold" fontSize="1.05rem" color="blackAlpha.800">
						{title}
						<Icon fontSize="0.9rem" mx="0.1rem" color="blackAlpha.500">
							<HiAtSymbol />
						</Icon>
						<ActionableTextHighlight
							tooltipContent={{
								icon: AvyIconnn,
								heading: subtitle,
								text: "Debit to credit platform. Financial literacy development",
								linkIcon: <ExternalLinkIcon fontSize="0.8rem" href={origin} />,
							}}
						>
							{subtitle}
						</ActionableTextHighlight>
					</Heading>
				) : (
					<Heading fontWeight="semibold" fontSize="1.05rem" color="blackAlpha.800">
						{title}
					</Heading>
				)}
			</HStack>
			<HStack>
				<Text fontSize="0.82rem" mt="1">
					{description}
				</Text>
			</HStack>
		</Flex>
	);
};

const TimelineEventDate: React.FC<{ date: string }> = ({ date }) => (
	<Em fontSize="2xs" width="fit-content" color="gray.600" lineHeight="50px">
		{date}
	</Em>
);

const TimelinePath: React.FC<{
	index: number;
	iconRef: React.RefObject<HTMLDivElement>;
	distances: (Distance | null)[];
}> = ({ iconRef, index, distances }) => {
	const distanceToNextTimelineIcon = distances[index]?.distance;
	// TODO: DEAR GOD PLEASE FIX THIS I HATE IT
	// justification - 20 is the circle icon container size
	// justification 2 - i need to redo the ref logic to better manage drilling of icon refs -- https://react.dev/reference/react/forwardRef
	const dynamicPathLength = distanceToNextTimelineIcon ? distanceToNextTimelineIcon - 20 : 100;
	const isLast = index === events.length - 1;

	const TimelineConnector = () => (
		<Box
			position="absolute"
			top="100%"
			width="1.5px"
			height={`${dynamicPathLength}px`}
			bg="blackAlpha.500"
			overflow="hidden"
			zIndex={0}
		/>
	);

	return (
		<Flex position="relative" width="auto" alignItems="center" justifyContent="center" ref={iconRef}>
			<Icon fontSize="20px" zIndex={1} color="#0891b2">
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
