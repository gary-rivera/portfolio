import type { CSSProperties } from "react";
import SectionHead from "@components/SectionHead";
import ProjectCard, { type LifespanAxis } from "./ProjectCard";
import { useProjectsContext } from "@context/ProjectsContext";
import "@styles/projects-log.css";

export default function ProjectsContainer() {
	const { projects, sortedDesc } = useProjectsContext();

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	// shared time axis: jan 1 of the earliest repo's year → now. every strip's
	// lifespan bar and the footer ticks position against this one scale, so
	// recency reads positionally down the whole stack
	const now = Date.now();
	const createdYears = visible
		.map((key) => projects[key].createdAt)
		.filter((d): d is Date => d instanceof Date)
		.map((d) => d.getFullYear());
	const startYear = createdYears.length > 0 ? Math.min(...createdYears) : new Date(now).getFullYear();
	const axis: LifespanAxis = { start: new Date(startYear, 0, 1).getTime(), end: now };

	const ticks: { year: number; x: number }[] = [];
	for (let year = startYear; year <= new Date(now).getFullYear(); year++) {
		const x = ((new Date(year, 0, 1).getTime() - axis.start) / (axis.end - axis.start)) * 100;
		// skip a year tick that would crowd the fixed "now" tick at the right edge
		if (x <= 94) ticks.push({ year, x });
	}

	return (
		<section aria-labelledby="projects-head">
			<SectionHead name="projects.log" meta={`${visible.length} public repos`} />
			<div className="pl-rack">
				<span className="pl-ret pl-ret--tl" aria-hidden="true" />
				<span className="pl-ret pl-ret--tr" aria-hidden="true" />
				<span className="pl-ret pl-ret--bl" aria-hidden="true" />
				<span className="pl-ret pl-ret--br" aria-hidden="true" />
				<ol className="pl-strips" aria-label="public projects, newest push first">
					{visible.map((projectKey) => (
						<ProjectCard key={projectKey} project={projects[projectKey]} axis={axis} />
					))}
				</ol>
				<div className="pl-axis-wrap">
					<div className="pl-axis" aria-hidden="true">
						{ticks.map(({ year, x }, i) => (
							<span
								key={year}
								className={`pl-tick ${i === 0 ? "pl-tick--first" : ""}`}
								style={{ "--x": `${x}%` } as CSSProperties}
							>
								<i />'{String(year).slice(-2)}
							</span>
						))}
						<span className="pl-tick pl-tick--now">
							<i />
							now
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
