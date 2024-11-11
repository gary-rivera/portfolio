import React, { useRef } from 'react';
import { useResumeRepo } from '../../hooks/useGitHub';
import { useDistanceBetweenElements } from '@/components/MeasureDistance';
import {
	Flex,
	Text,
	Card,
	Em,
	Box,
	Icon,
	VStack,
	GridItem,
	Grid,
} from '@chakra-ui/react';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { LuTarget } from 'react-icons/lu';

import { Event, events } from '@/data/experience';

type TimelineItemProps = {
	event: Event;
	index: number;
	isFirst: boolean;
	isLast: boolean;
	alternate: boolean;

	iconRef: React.RefObject<HTMLDivElement>;
};

// type TimelineEventCardProps = {
// 	description: string;
// };

// type TimelineEventDateProps = {
// 	date: string;
// };

const gridItemProps = {
	// bg: 'green',
	// border: '2px solid cyan',
	height: '115%',
};
const cardItemProps = {
	// bg: 'green',
	// border: '1px solid',
	borderColor: 'rgba(12,92,114, 0.2)',
	height: '100%',
};

function ExperienceTimeline() {
	const { readmeContent, isLoading, isError } = useResumeRepo();

	const iconRefs = events.map(() => useRef<HTMLDivElement>(null));

	const distances = iconRefs.map((ref, index) => {
		if (index < iconRefs.length - 1) {
			return useDistanceBetweenElements(ref, iconRefs[index + 1]);
		}
		return null;
	});
	console.log({ distances });
	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;

	const TimelineItem: React.FC<TimelineItemProps> = ({
		event,
		index,
		isFirst,
		isLast,
		alternate,
		iconRef,
	}) => {
		const layout1 = (
			<>
				<GridItem width="auto" height="fit-content" justifySelf="end">
					<TimelineEventDate date={event.date} />
				</GridItem>
				<GridItem
					placeSelf="center"
					// border="1px solid red"
					h="max-content"
				>
					<TimelinePath iconRef={iconRef} index={index} />
				</GridItem>
				<GridItem {...gridItemProps}>
					<TimelineEventCard description={event.description} />
				</GridItem>
			</>
		);

		const layout2 = (
			<>
				<GridItem>
					<TimelineEventCard
						description={event.description}
						{...gridItemProps}
					/>
				</GridItem>
				<GridItem placeSelf="center">
					<TimelinePath iconRef={iconRef} index={index} />
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
				overflow="visible"
				w="100%"
				h="110%"
			>
				{alternate ? layout2 : layout1}
			</Grid>
		);
	};

	const TimelinePath: React.FC<{
		index: number;
		iconRef: React.RefObject<HTMLDivElement>;
	}> = ({ iconRef, index }) => {
		// .toFixed(2)
		const distanceToNextTimelineIcon = distances[index]?.distance || 0;
		const halfDistance = distanceToNextTimelineIcon
			? distanceToNextTimelineIcon / 2
			: undefined;

		const isFirst = index === 0;
		const isLast = index === events.length - 1;
		// render two vertical lines: topHalf and bottomHalf
		const TopHalf = () => (
			<Box
				position="absolute"
				top="100%"
				// bottom={0}
				width="2px"
				height={`${halfDistance}px`}
				backgroundColor="black"
				transform="translateY(-50%)"
				zIndex={0}
			/>
		);
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

		console.log('[Experience][TimelinePath]: ', {
			distanceToNextTimelineIcon,
			halfDistance,
			index,
			isFirst,
			isLast,
		});
		return (
			<Flex
				position="relative"
				width="auto"
				// height="100px"
				alignItems="center"
				justifyContent="center"
				ref={iconRef}
				// border="2px solid green"
			>
				<Icon fontSize="20px" zIndex={1} color="rgba(8, 145, 178)">
					{/* <VscCircleLargeFilled opacity="0.8" /> */}
					<LuTarget opacity="0.8" />
				</Icon>
				{/* {!isFirst && <TopHalf />} */}
				{!isLast && <TimelineConnector />}
			</Flex>
		);
	};

	const TimelineEventCard: React.FC<{ description: string }> = ({
		description,
	}) => (
		<Card.Root w="auto" bg="rgba(0, 0, 0, 0.035)" {...cardItemProps}>
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

	return (
		<VStack gap={0} position="relative" py="1rem">
			{distances.map((distanceObj, index) =>
				distanceObj ? (
					<Box key={index}>
						<p>
							Distance between icons {index} and {index + 1}:{' '}
							{distanceObj.distance?.toFixed(2)}px
						</p>
					</Box>
				) : null
			)}
			{/* <div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: '50%',
					width: '1px',
					transform: 'translateX(-50%)',
					zIndex: 1000,
					// backgroundColor: 'red',
					opacity: 0.75,
				}}
			></div> */}
			{events.map((event, index) => {
				const isFirst = index === 0;
				const isLast = index === events.length - 1;
				const alternate = !!(index % 2);

				return (
					<TimelineItem
						key={index}
						index={index}
						event={event}
						isFirst={isFirst}
						isLast={isLast}
						alternate={alternate}
						iconRef={iconRefs[index]}
					/>
				);
			})}
			<Text>
				Total events: <Em fontStyle="bold">{events.length}</Em>
			</Text>
		</VStack>
	);
}

export default ExperienceTimeline;
