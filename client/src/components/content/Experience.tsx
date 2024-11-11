import React from 'react';
import { useResumeRepo } from '../../hooks/useGitHub';
import {
	Flex,
	Heading,
	Text,
	Link,
	Code,
	Card,
	Em,
	Box,
	List,
	Icon,
	ListItem,
	Image,
	Stack,
	HStack,
	VStack,
	GridItem,
	Grid,
} from '@chakra-ui/react';
import Markdown from 'react-markdown';

import { VscCircleLargeFilled } from 'react-icons/vsc';
import { Event, events } from '@/data/experience';

type TimelineItemProps = {
	event: Event;
	isFirst: boolean;
	isLast: boolean;
	alternate: boolean;
};

type TimelineEventCardProps = {
	description: string;
};

type TimelineEventDateProps = {
	date: string;
};

function ExperienceTimeline() {
	const { readmeContent, isLoading, isError } = useResumeRepo();

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contentsaaa</p>;

	const TimelineItem: React.FC<TimelineItemProps> = ({
		event,
		isFirst,
		isLast,
		alternate,
	}) => {
		const layout2 = (
			<>
				<GridItem width="auto" height="fit-content" justifySelf="end">
					<TimelineEventDate date={event.date} />
				</GridItem>

				<GridItem placeSelf="center">
					<TimelinePath />
				</GridItem>
				<GridItem height="fit-content">
					<TimelineEventCard description={event.description} />
				</GridItem>
			</>
		);

		const layout1 = (
			<>
				<GridItem height="fit-content">
					<TimelineEventCard description={event.description} />
				</GridItem>
				<GridItem placeSelf="center">
					<TimelinePath />
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
				// border="2px solid yellow"
				templateColumns="1fr auto 1fr"
				templateRows="1fr"
				gridAutoFlow="row"
				gridAutoColumns="auto"
				alignItems="center"
				justifyContent="center"
				w="100%"
				h="auto"
				py="2rem"
			>
				{alternate ? layout1 : layout2}
			</Grid>
		);
	};

	const TimelinePath = () => (
		<Flex
			top={0}
			bottom={0}
			minH="30px"
			w="auto"
			h="100%"
			// border="2px solid green"
			justify={'center'}
			alignItems={'center'}
		>
			{/* <VStack position="relative" h="inherit"> */}
			<Flex
				h="100%"
				justifyContent="center"
				alignItems="center"
				// position="relative"
			>
				{/* Circle indicator */}
				<Icon fontSize="14px" zIndex={1}>
					<VscCircleLargeFilled />
				</Icon>
			</Flex>
			{/* </VStack> */}
		</Flex>
	);

	const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
		description,
	}) => (
		// <Flex w="auto" h="auto" alignItems="center">
		<Card.Root w="auto" h="auto" maxHeight="100%" bg="rgba(0, 0, 0, 0.075)">
			<Card.Body>
				<Card.Title>Event Title</Card.Title>
				<Card.Description>{description || 'fuck'}</Card.Description>
			</Card.Body>
			{/* <Card.Footer justifyContent="flex-end">
				<Em>Footer content</Em>
			</Card.Footer> */}
		</Card.Root>
		// </Flex>
	);

	const TimelineEventDate: React.FC<TimelineEventDateProps> = ({ date }) => (
		<Box
			/*bg="rgba(0, 0, 0, 0.05)"*/ width="fit-content"
			color="black"
			w="auto"
		>
			<Em width="fit-content" color="gray.600">
				{date}
			</Em>
		</Box>
	);
	return (
		<VStack gap={0} position="relative" /*border="2px solid red"*/ pb="1rem">
			<div
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
			></div>
			{events.map((e, index) => {
				const isFirst = index === 0;
				const isLast = index === events.length - 1;
				const alternate = !!(index % 2);
				return (
					<TimelineItem
						key={index}
						event={e}
						isFirst={isFirst}
						isLast={isLast}
						alternate={alternate}
					/>
				);
			})}
		</VStack>
	);
}

export default ExperienceTimeline;
