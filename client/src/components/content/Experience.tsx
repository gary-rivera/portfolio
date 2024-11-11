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

	const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => (
		<Grid
			gap={0}
			position="relative"
			border="2px solid white"
			// gridTemplateRows={'40px repeat(1, 1fr)'}
			templateColumns="1fr auto 1fr"
			templateRows="1fr"
			gridAutoFlow="row"
			gridAutoColumns="auto"
			alignItems="center"
			justifyContent="center"
			// gridAutoRow="50px"
			w="100%"
			h="auto"
		>
			<GridItem
				bg="green.solid"
				border="1px solid yellow"
				// rowSpan={1}
				width="auto"
				height="fit-content"
			>
				<TimelineEventDate date={event.date} />
			</GridItem>

			<GridItem
				// bg="tomato"
				// rowSpan={1}

				placeSelf="center"
			>
				<TimelinePath />
			</GridItem>
			<GridItem
				bg="teal.solid"
				// rowSpan={1}

				height="fit-content"
			>
				<TimelineEventCard description={event.description} />
			</GridItem>
		</Grid>
	);

	const TimelinePath = () => (
		<Flex
			top={0}
			bottom={0}
			minH="30px"
			w="auto"
			h="100%"
			border="2px solid green"
			justify={'center'}
			alignItems={'center'}
		>
			{/* <VStack position="relative" h="inherit"> */}
			<Flex h="100%" justifyContent="center" alignItems="center">
				{/* Circle indicator */}
				<Icon fontSize="14px" zIndex={1}>
					<VscCircleLargeFilled />
				</Icon>
				{/* <TimelineConnector />, */}
				{/* <Box
					position="absolute"
					flexGrow={1}
					top={1}
					width="2px"
					bg="gray.400"
					h="100%"
					zIndex={0}
				/> */}
			</Flex>
			{/* </VStack> */}
		</Flex>
	);

	const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
		description,
	}) => (
		// <Flex w="auto" h="auto" alignItems="center">
		<Card.Root w="auto" h="auto" maxHeight="75%" my="1rem">
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
		<Box bg="white" width="auto">
			<Text>{date}</Text>
		</Box>
	);
	return (
		<VStack gap={0} position="relative" border="2px solid red" py="1rem">
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
			{events.map((e, index) => (
				<TimelineItem key={index} event={e} />
			))}
		</VStack>
	);
}

export default ExperienceTimeline;
