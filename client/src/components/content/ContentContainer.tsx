import { useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	HStack,
	Tabs,
	Text,
	VStack,
} from '@chakra-ui/react';
import { MdCircle as FilledCircle } from 'react-icons/md';
import { FaCircleHalfStroke as HalfFilledCircle } from 'react-icons/fa6';
import { FaCircle as EmptyCircle } from 'react-icons/fa';

function ContentContainer() {
	// DONE: timeline to the left
	// DONE: Tab toggle + Container
	// TODO: experience tab
	// TODO: projects tab
	// TODO: dynamic sizing - https://v2.chakra-ui.com/docs/components/transitions/usage#changing-the-startingheight OR https://v2.chakra-ui.com/docs/components/transitions/usage#changing-transitions-manually-using-motion-props

	// TODO: make dynamic circle progress? is there enough content? https://www.chakra-ui.com/docs/components/progress-circle
	// TODO: progress bar reactive to progress of mouse in container?
	// NOTE: pick one of these ^^
	const Timeline = ({ year }: { year: string }) => (
		<Flex alignItems="start" direction="column" h="100%" py={4} pl={2}>
			<VStack position="relative" h="inherit">
				<Flex
					position="relative"
					h="95%"
					justifyContent="center"
					// flexDirection="column"
				>
					<FilledCircle size="8px" />
					<Box
						position="absolute"
						flexGrow={1}
						top="3.5"
						w="0"
						h="100%"
						className="tl-progress-bar"
						borderLeft="1px dashed black"
					/>
				</Flex>

				<HStack position="absolute" left="3" top="-2">
					<Text>{year}</Text>
					{/* <HalfFilledCircle /> */}
					{/* <EmptyCircle /> */}
				</HStack>
				<HStack></HStack>
			</VStack>
		</Flex>
	);

	return (
		<Grid
			className="content-container"
			gridTemplateRows={'40px repeat(1, 1fr)'}
			gridTemplateColumns="repeat(5, 1fr)"
			mt="2rem"
		>
			<GridItem rowSpan={1} colSpan={1} colStart={1} rowStart={2} bg="tomato">
				<Timeline year="2024" />
				{/* <HalfFilledCircle /> */}
				{/* <EmptyCircle /> */}
			</GridItem>
			<GridItem rowSpan={2} colSpan={4}>
				<Tabs.Root
					variant="line"
					defaultValue="experience"
					/*value={value} onValueChange={(e) => setValue(e.value)}*/
				>
					<Tabs.List rounded="l3" px="0">
						<Tabs.Trigger value="experience" bg="none" bgClip="inherit">
							Experience
						</Tabs.Trigger>
						<Tabs.Trigger value="projects" bg="none">
							Projects
						</Tabs.Trigger>
						<Tabs.Indicator
							rounded="l1"
							bg={'blue.500'}
							outlineColor="yellow"
						/>
					</Tabs.List>

					<Tabs.Content bg="green.300" value="experience" py={2}>
						<ul>
							<li>Item 1</li>
							<li>Item 2</li>
							<li>Item 3</li>
							<li>Item 4</li>
							<li>Item 5</li>
							<li>Item 6</li>
							<li>Item 7</li>
							<li>Item 8</li>
							<li>Item 9</li>
						</ul>
					</Tabs.Content>
					<Tabs.Content bg="green.300" value="projects">
						Projects panel
					</Tabs.Content>
				</Tabs.Root>
			</GridItem>
		</Grid>
	);
}

export default ContentContainer;
