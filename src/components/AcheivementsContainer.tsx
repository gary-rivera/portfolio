import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

export default function AcheivementsContainer() {
	return (
		<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
			<div className="lg:col-span-7">
				<ExperienceContainer />
			</div>
			<div className="lg:col-span-5">
				<ProjectsContainer />
			</div>
		</div>
	);
}
