import { Flex } from "@chakra-ui/react";
import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

function AcheivementsContainer() {
	return (
		<Flex direction="column" gap="3rem" w="full">
			<ExperienceContainer />
			<ProjectsContainer />
		</Flex>
	);
}

export default AcheivementsContainer;
