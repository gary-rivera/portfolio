import SectionHead from "@/components/SectionHead";
import ProjectRow from "./ProjectCard";
import { useProjectsContext } from "@/context/ProjectsContext";

const TH = "border-b border-dashed border-rule px-3 py-1.5 text-left text-[11px] font-normal lowercase tracking-wider text-text-subtle";

function ProjectsContainer() {
	const { projects, sortedDesc, isLoading, isError } = useProjectsContext();

	if (isLoading)
		return (
			<section>
				<SectionHead name="projects.log" meta="loading…" />
				<p className="text-[12px] text-text-subtle">loading…</p>
			</section>
		);
	if (isError)
		return (
			<section>
				<SectionHead name="projects.log" meta="err" />
				<p className="text-[12px] text-danger">error loading repositories.</p>
			</section>
		);

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	return (
		<section>
			<SectionHead name="projects.log" meta={`ls -la · ${visible.length} active`} />
			<table className="w-full border-collapse text-[13px]">
				<thead>
					<tr>
						<th className={`${TH} w-10`}>#</th>
						<th className={`${TH} w-40`}>name</th>
						<th className={TH}>description</th>
						<th className={`${TH} w-56`}>stack</th>
						<th className={`${TH} w-20`}>year</th>
						<th className={`${TH} w-36`}>links</th>
					</tr>
				</thead>
				<tbody>
					{visible.map((projectKey, idx) => (
						<ProjectRow key={projectKey} project={projects[projectKey]} index={idx} />
					))}
				</tbody>
			</table>
		</section>
	);
}

export default ProjectsContainer;
