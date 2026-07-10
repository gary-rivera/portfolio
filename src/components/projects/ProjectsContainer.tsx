import SectionHead from "@components/SectionHead";
import ProjectCard from "./ProjectCard";
import { useProjectsContext } from "@context/ProjectsContext";

export default function ProjectsContainer() {
	const { projects, sortedDesc } = useProjectsContext();

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	return (
		<section aria-labelledby="projects-head">
			<SectionHead name="projects.log" meta={`${visible.length} public`} />
			<div className="flex flex-col gap-2">
				{visible.map((projectKey, idx) => (
					<ProjectCard key={projectKey} project={projects[projectKey]} index={idx} />
				))}
			</div>
		</section>
	);
}
