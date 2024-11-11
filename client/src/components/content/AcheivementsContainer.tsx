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
				<Flex h="95%" justifyContent="center">
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

				<HStack position="absolute" left="3" top="-2"></HStack>
				<HStack></HStack>
			</VStack>
		</Flex>
	);

	const ContentContainer = () => (
		<motion.div
			key={activeTab}
			ref={contentRef}
			initial={{ opacity: 0, minHeight: '33%' }}
			animate={{ opacity: 1, minHeight: height, maxHeight: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.6 }}
			style={{
				overflow: 'hidden',
				// maxWidth: '600px',
				// border: '2px solid green',
			}}
		>
			{activeTab === 'experience' && <Experience />}

			{activeTab === 'projects' && (
				<Box p={4}>
					<ProjectsContainer />
				</Box>
			)}
		</motion.div>
	);

	return (
		<Grid
			gridTemplateRows={'40px repeat(1, 1fr)'}
			gridTemplateColumns="repeat(4, 1fr)"
			mt="2rem"
		>
			<GridItem rowSpan={1} colSpan={2}>
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
						<Tabs.Indicator rounded="l1" bg="rgba(0, 0, 0, 0.1)" />
					</Tabs.List>
				</Tabs.Root>
			</GridItem>

			<GridItem rowSpan={1} colSpan={4}>
				<ContentContainer />
			</GridItem>
		</Grid>
	);
}

export default AcheivementsContainer;
