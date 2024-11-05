import { useEffect, useState, useRef } from 'react';
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
import { motion } from 'framer-motion';
import { MdCircle as FilledCircle } from 'react-icons/md';
import { FaCircleHalfStroke as HalfFilledCircle } from 'react-icons/fa6';
import { FaCircle as EmptyCircle } from 'react-icons/fa';

function ContentContainer() {
	const [activeTab, setActiveTab] = useState('experience');
	const [height, setHeight] = useState('auto');
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (contentRef.current) {
			const scrollHeight = `${contentRef.current.scrollHeight}px`;
			setHeight(scrollHeight);
		}
	}, [activeTab]);

	const toggleActiveTab = () => {
		setActiveTab(activeTab === 'experience' ? 'projects' : 'experience');
	};

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
				<Flex position="relative" h="95%" justifyContent="center">
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
			gridTemplateColumns="repeat(6, 1fr)"
			mt="2rem"
		>
			<GridItem
				className="nav-tabs-grid-item"
				rowSpan={1}
				colSpan={2}
				colStart={2}
			>
				<Tabs.Root
					variant="line"
					defaultValue="experience"
					onValueChange={toggleActiveTab}
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
				</Tabs.Root>
			</GridItem>
			<GridItem
				className="timeline-grid-item"
				rowSpan={1}
				colSpan={1}
				rowStart={2}
				bg="tomato"
			>
				<Flex alignItems="start" direction="column" h="100%" py={4} pl={2}>
					<VStack position="relative" h="inherit">
						<Flex position="relative" h="95%" justifyContent="center">
							<FilledCircle size="8px" />
							<Box
								position="absolute"
								flexGrow={1}
								top={2.5}
								w={0}
								h="100%"
								className="tl-progress-bar"
								borderLeft="1px dashed black"
							/>
						</Flex>

						<HStack position="absolute" left="3" top="-2">
							<Text>2024</Text>
						</HStack>
						<HStack></HStack>
					</VStack>
				</Flex>
			</GridItem>
			<GridItem className="content-grid-item" rowSpan={1} colSpan={5}>
				{/* Motion wrapper for animating height */}
				<motion.div
					key={activeTab}
					ref={contentRef}
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.6 }}
					style={{ overflow: 'hidden' }}
				>
					{activeTab === 'experience' && (
						<Box bg="green.300" p={4}>
							<ul>
								<li>Item 1</li>
								<li>Item 2</li>
								<li>Item 3</li>
								<li>Item 4</li>
								<li>Item 5</li>
							</ul>
						</Box>
					)}

					{activeTab === 'projects' && (
						<Box bg="green.300" p={4}>
							Projects panel content
						</Box>
					)}
				</motion.div>
			</GridItem>
		</Grid>
	);
}

export default ContentContainer;
