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
import Experience from '../experience/Container';
import ProjectsContainer from './Projects';

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
			{/* {activeTab === 'experience' && <ExperienceContainer />} */}

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
					colorPalette="cyan"
				>
					<Tabs.List>
						<Tabs.Trigger value="experience">Experience</Tabs.Trigger>
						<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
						<Tabs.Indicator rounded="l1" bg="rgba(0, 0, 0, 0.02)" />
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
