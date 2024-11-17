import React from "react";
import { chakra, Flex, Em, HStack, Heading, Box, Icon, GridItem, Grid, useRecipe, Text } from "@chakra-ui/react";
import ActionableTextHighlight from "../ui/ActionableTextHighlight";

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
	const { event: eventTitle, subtitle, companyName, description, date, origin, attributes, category, icon } = event;

	const recipe = useRecipe({ key: "eventCard" });
	const titleStyles = {
		fontSize: ["0.70rem", "0.8rem", "0.85rem", "1rem"],
		fontWeight: "semibold",
		color: "blackAlpha.800",
		lineHeight: "normal",
	};
	return (
		<Flex
			gap={0}
			//
			w="auto"
			bg={["blue.100", "red.200", "yellow.200", "var(--primary-bg-color)"]}
			h={["auto", "auto", "auto", "100%"]}
			borderRadius="5px"
			py={[2.5, 3]}
			px={[3, 4, 5]}
			direction="column"
			justifyContent="space-evenly"
			fontSize="24px"
			// border="1px solid orange"
		>
			{/* Title */}
			<HStack
				mb="0"
				//
				h="fit-content"
			>
				{subtitle ? (
					<Flex gap="0.05rem" align="center" wrap="nowrap">
						<Heading
							{...titleStyles}
							//
						>
							{eventTitle}
						</Heading>
						<Icon //
							fontSize={["0.5rem", "0.75rem", "0.7rem", "0.85rem"]}
							mt="1px"
							// border="1px solid red"
							color="blackAlpha.500"
						>
							<HiAtSymbol />
						</Icon>
						<ActionableTextHighlight
							tooltipContent={{
								icon,
								heading: companyName,
								text: "Debit to credit platform. Financial literacy development",
								iconLinkUrl: origin,
							}}
							linkProps={{ ...titleStyles }}
						>
							{subtitle}
						</ActionableTextHighlight>
					</Flex>
				) : (
					<Heading //
						{...titleStyles}
					>
						{eventTitle}
					</Heading>
				)}
			</HStack>
			{/* Subtext */}
			{description && (
				<Text fontSize={["0.5rem", "0.65rem", "0.65rem", "0.8rem"]} mt="1">
					{description}
				</Text>
			)}
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
	const LayoutOfDateIconCard = (
		<>
			<GridItem //
				width="auto"
				height="fit-content"
				justifySelf="end"
			>
				<TimelineEventDate date={event.date} />
			</GridItem>
			<GridItem placeSelf="center">
				<TimelinePath iconRef={iconRef} index={index} distances={distances} />
			</GridItem>
			<GridItem
				h="auto"
				justifySelf="start"
				alignItems="center"
				// border="1px solid red"
			>
				<TimelineEventCard event={event} />
			</GridItem>
		</>
	);

	const LayoutOfCardIconDate = (
		<>
			<GridItem //
				h="auto"
				// border="1px solid red"
				justifySelf="end"
				alignItems="center"
			>
				<TimelineEventCard event={event} />
			</GridItem>
			<GridItem placeSelf="center">
				<TimelinePath iconRef={iconRef} index={index} distances={distances} />
			</GridItem>
			<GridItem //
				width="auto"
				justifySelf="start"
			>
				<TimelineEventDate date={event.date} />
			</GridItem>
		</>
	);

	return (
		<Grid
			gap={[0.25, 1, 2]}
			position="relative"
			templateColumns="1fr auto 1fr"
			templateRows="1fr"
			gridAutoFlow="row"
			gridAutoColumns="auto"
			alignItems="center"
			justifyContent="center"
			// border="1px solid green"

			my="-1.5"
		>
			{alternate ? LayoutOfCardIconDate : LayoutOfDateIconCard}
		</Grid>
	);
}

export default TimelineItem;
