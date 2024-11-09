import { useEffect, useState, useRef } from 'react';
import {
	Box,
	Em,
	Flex,
	Grid,
	GridItem,
	HStack,
	Tabs,
	VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Experience from './Experience';
import ProjectsContainer from './Projects';

import { MdCircle as FilledCircle } from 'react-icons/md';

function AcheivementsContainer() {
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

	const Timeline = ({ year }: { year: string }) => (
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
					<Em>{year}</Em>
				</HStack>
				<HStack></HStack>
			</VStack>
		</Flex>
	);

	const ContentContainer = () => (
		<motion.div
			key={activeTab}
			ref={contentRef}
			initial={{ opacity: 0, minHeight: '33%' }}
			animate={{ opacity: 1, minHeight: height, maxHeight: '500px' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.6 }}
			style={{ overflow: 'hidden' }}
		>
			{activeTab === 'experience' && (
				<Box
					// bg="green.300"
					p={4}
				>
					{/* REF for bullet points or heading?: https://www.chakra-ui.com/docs/components/blockquote */}
					<Experience />
				</Box>
			)}

			{activeTab === 'projects' && (
				<Box
					// bg="green.300"
					p={4}
				>
					<ProjectsContainer />
				</Box>
			)}
		</motion.div>
	);

	return (
		<Grid
			className="content-container"
			gridTemplateRows={'40px repeat(1, 1fr)'}
			gridTemplateColumns="repeat(4, 1fr)"
			mt="2rem"
		>
			<GridItem className="nav-tabs-grid-item" rowSpan={1} colSpan={2}>
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

			<GridItem className="content-grid-item" rowSpan={1} colSpan={4}>
				<ContentContainer />
			</GridItem>
		</Grid>
	);
}

export default AcheivementsContainer;
