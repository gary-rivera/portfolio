import { chakra, Text } from "@chakra-ui/react";
import SectionHead from "@/components/SectionHead";
import ProjectRow from "./ProjectCard";
import { useProjectsContext } from "@/context/ProjectsContext";

function ProjectsContainer() {
	const { projects, sortedDesc, isLoading, isError } = useProjectsContext();

	if (isLoading)
		return (
			<section>
				<SectionHead name="projects.log" meta="loading…" />
				<Text color="textSubtle" fontSize="12px">
					loading…
				</Text>
			</section>
		);
	if (isError)
		return (
			<section>
				<SectionHead name="projects.log" meta="err" />
				<Text color="danger" fontSize="12px">
					error loading repositories.
				</Text>
			</section>
		);

	const visible = sortedDesc.filter((projectKey) => projects[projectKey]?.active);

	return (
		<section>
			<SectionHead name="projects.log" meta={`ls -la · ${visible.length} active`} />
			<chakra.table w="100%" borderCollapse="collapse" fontSize="13px">
				<chakra.thead>
					<chakra.tr>
						<TH width="40px">#</TH>
						<TH width="160px">name</TH>
						<TH>description</TH>
						<TH width="220px">stack</TH>
						<TH width="80px">year</TH>
						<TH width="140px">links</TH>
					</chakra.tr>
				</chakra.thead>
				<chakra.tbody>
					{visible.map((projectKey, idx) => (
						<ProjectRow key={projectKey} project={projects[projectKey]} index={idx} />
					))}
				</chakra.tbody>
			</chakra.table>
		</section>
	);
}

const TH = ({ children, width }: { children: React.ReactNode; width?: string }) => (
	<chakra.th
		textAlign="left"
		color="textSubtle"
		fontWeight="400"
		fontSize="11px"
		textTransform="lowercase"
		letterSpacing="0.06em"
		px="0.75rem"
		py="0.4rem"
		borderBottom="1px dashed"
		borderColor="rule"
		w={width}
	>
		{children}
	</chakra.th>
);

export default ProjectsContainer;
