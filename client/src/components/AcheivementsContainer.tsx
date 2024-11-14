import { useEffect, useState, useRef } from "react";
import { Box, Em, Flex, Grid, GridItem, HStack, Tabs, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

function AcheivementsContainer() {
	const [activeTab, setActiveTab] = useState("experience");
	const [height, setHeight] = useState("auto");
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (contentRef.current) {
			const scrollHeight = `${contentRef.current.scrollHeight}px`;
			setHeight(scrollHeight);
		}
	}, [activeTab]);

	const toggleActiveTab = () => {
		setActiveTab(activeTab === "experience" ? "projects" : "experience");
	};

	const ContentContainer = () => (
		<div
			key={activeTab}
			ref={contentRef}
			// initial={{ opacity: 0, minHeight: "33%" }}
			// animate={{ opacity: 1, minHeight: height, maxHeight: "auto" }}
			// exit={{ opacity: 0, height: 0 }}
			// transition={{ duration: 0.6 }}
			style={{
				overflowY: "auto",
				height: "40rem",
				maxHeight: "80vh",
				scrollbarColor: "rgba(8, 145, 178, 0.4) transparent",
				scrollbarWidth: "thin",
				scrollMarginBlockEnd: "true",
			}}
		>
			{activeTab === "experience" && <ExperienceContainer />}

			{activeTab === "projects" && <ProjectsContainer />}
			{/* Someday: Contributions Tab */}
		</div>
	);

	return (
		<Grid gridTemplateRows={"40px repeat(1, 1fr)"} gridTemplateColumns="repeat(4, 1fr)" mt="2rem" overflowY="scroll">
			<GridItem rowSpan={1} colSpan={2}>
				<Tabs.Root
					variant="line"
					defaultValue="experience"
					onValueChange={toggleActiveTab}
					colorPalette="cyan"
					_focus={{
						outline: "none",
						boxShadow: "none",
					}}
				>
					<Tabs.List w="min-content">
						<Tabs.Trigger _hover={{}} value="experience">
							Experience
						</Tabs.Trigger>
						<Tabs.Trigger
							value="projects"
							_focus={{
								outline: "none",
								boxShadow: "none",
							}}
						>
							Projects
						</Tabs.Trigger>
						<Tabs.Indicator rounded="l1" bg="blackAlpha.100" />
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
