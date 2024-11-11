import { Flex } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { useProjectsContext } from "@/context/ProjectsContext";

function ProjectsContainer() {
	const { projects, isLoading, isError } = useProjectsContext();

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contents</p>;

	return (
		<Flex direction="column" gap="2">
			{Object.keys(projects).map((projectKey: string, idx) => {
				if (projects[projectKey].active) return <ProjectCard key={idx} project={projects[projectKey]} />;
			})}
		</Flex>
	);
}

export default ProjectsContainer;
