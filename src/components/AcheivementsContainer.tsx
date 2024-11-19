import { useState } from "react";
import { HStack, VStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

function AcheivementsContainer() {
	const [activeTab, setActiveTab] = useState<"experience" | "projects">("experience");

	const toggleActiveTab = () => {
		setActiveTab(activeTab === "experience" ? "projects" : "experience");
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
				height: "100%",
				width: "100%",
				overflowY: "scroll",
				overflowX: "visible",
				scrollbarColor: "rgba(8, 145, 178, 0.4) transparent",
				scrollbarWidth: "thin",
				scrollMarginBlockEnd: "true",
			}}
		>
			{activeTab === "experience" && <ExperienceContainer />}

			{activeTab === "projects" && <ProjectsContainer />}
			{/* Someday: Contributions Tab */}
		</motion.div>
	);

	return (
		<VStack
			key="acheivements-container"
			w="full"
			align="start"
			mt={["0.5rem", "1rem", "1.5rem"]}
			mb="0"
			gap="0"
			h={["42rem", "45rem", "43rem"]}
		>
			{/* Tab Navigation */}
			<HStack justify="start" gap="0">
				{["Experience", "Projects"].map((tabName) => {
					const isActiveTab = activeTab === tabName.toLowerCase();
					const dynamicStyles = {
						active: {
							bg: "blackAlpha.100",
							borderBottom: "2px solid var(--primary-blue)",
							color: "blackAlpha.900",
						},
						inactive: {
							bg: "transparent",
							color: "blackAlpha.500",
						},
					}[isActiveTab ? "active" : "inactive"];
					return (
						<Button
							key={`${tabName}-${isActiveTab}`}
							onClick={toggleActiveTab}
							borderBottomRadius="0"
							borderTopRadius="xs"
							{...dynamicStyles}
						>
							{tabName}
						</Button>
					);
				})}
			</HStack>

			<ContentContainer />
		</VStack>
	);
}

export default AcheivementsContainer;
