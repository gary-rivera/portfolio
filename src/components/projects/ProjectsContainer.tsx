import SectionHead from "@components/SectionHead";
import ProjectCard from "./ProjectCard";
import { useProjectsContext } from "@context/ProjectsContext";

export default function ProjectsContainer() {
	const { projects, sortedDesc, isLoading, isError } = useProjectsContext();

	if (isLoading)
		return (
			<section aria-labelledby="projects-head">
				<SectionHead name="projects.log" meta="loading…" />
				<p className="text-sm text-text-subtle">loading…</p>
			</section>
		);
	if (isError)
		return (
			<section aria-labelledby="projects-head">
				<SectionHead name="projects.log" meta="err" />
				<p className="text-sm text-danger">error loading repositories.</p>
			</section>
		);

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	return (
		<section aria-labelledby="projects-head">
			<SectionHead name="projects.log" meta={`ls -la · ${visible.length} active`} />
			<div className="flex flex-col gap-2">
				{visible.map((projectKey, idx) => (
					<ProjectCard key={projectKey} project={projects[projectKey]} index={idx} />
				))}
			</div>
		</section>
	);
}
