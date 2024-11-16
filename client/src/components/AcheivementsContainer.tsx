import { useEffect, useState, useRef } from "react";
import { Box, Em, Flex, Grid, GridItem, HStack, Tabs, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

function AcheivementsContainer() {
	const [activeTab, setActiveTab] = useState<"experience" | "projects">("experience");

	const toggleActiveTab = () => {
		setActiveTab(activeTab === "experience" ? "projects" : "experience");
	};

	const renderContent = () => {
		if (activeTab === "experience") {
			return <ExperienceContainer />;
		} else {
			return <ProjectsContainer />;
		}
	};

	const ContentContainer = () => (
		<motion.div
			key={activeTab}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.6 }}
			style={{
				overflowY: "scroll",
				height: "100%",
				scrollbarColor: "rgba(8, 145, 178, 0.4) transparent",
				scrollbarWidth: "thin",
				scrollMarginBlockEnd: "true",
				border: "3px solid green",
			}}
		>
			{activeTab === "experience" && <ExperienceContainer />}

			{activeTab === "projects" && <ProjectsContainer />}
			{/* Someday: Contributions Tab */}
		</motion.div>
	);

	return (
		<Grid
			gridTemplateRows={"40px repeat(1, 1fr)"}
			gridTemplateColumns="repeat(4, 1fr)"
			//
			mt={["0.5rem", "1rem", "1.5rem"]}
			mb="0"
			overflowY="scroll"
			h={["41rem", "44rem", "43rem"]}
			border="1px solid red"
		>
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
						<Tabs.Indicator rounded="l1" bg="var(--primary-bg-color)" />
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
