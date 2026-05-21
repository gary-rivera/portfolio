import ExperienceContainer from "./experience/ExperienceContainer";
import ProjectsContainer from "./projects/ProjectsContainer";

function AcheivementsContainer() {
	return (
		<div className="flex w-full flex-col gap-12">
			<ExperienceContainer />
			<ProjectsContainer />
		</div>
	);
}

export default AcheivementsContainer;
