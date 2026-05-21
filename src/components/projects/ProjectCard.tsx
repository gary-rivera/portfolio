import { chakra } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Project } from "@/data/projects";

interface ProjectRowProps {
	project: Project;
	index: number;
}

/** One row of the projects.log indexed table. */
function ProjectRow({ project, index }: ProjectRowProps) {
	const { links, name, description, createdAt, tags } = project;
	const number = (index + 1).toString().padStart(2, "0");
	const year = createdAt ? dayjs(createdAt).format("YYYY") : "—";
	const stack = (tags && tags.length > 0 ? tags : []).join(" · ");

	return (
		<chakra.tr
			transition="background 120ms var(--ease-out)"
			_hover={{ bg: "rgba(123, 192, 137, 0.045)" }}
			cursor="default"
			role="group"
		>
			<chakra.td px="0.75rem" py="0.55rem" color="textSubtle" borderBottom="1px solid" borderColor="bgRaised">
				{number}
			</chakra.td>
			<chakra.td
				px="0.75rem"
				py="0.55rem"
				color="text"
				fontWeight="500"
				borderBottom="1px solid"
				borderColor="bgRaised"
				_groupHover={{ color: "phosphor" }}
				transition="color 120ms var(--ease-out)"
			>
				{name.toLowerCase()}
			</chakra.td>
			<chakra.td
				px="0.75rem"
				py="0.55rem"
				color="text"
				borderBottom="1px solid"
				borderColor="bgRaised"
				fontSize="13px"
			>
				{description ?? <chakra.span color="textSubtle">—</chakra.span>}
			</chakra.td>
			<chakra.td
				px="0.75rem"
				py="0.55rem"
				color="textMuted"
				borderBottom="1px solid"
				borderColor="bgRaised"
				fontSize="13px"
			>
				{stack || <chakra.span color="textSubtle">—</chakra.span>}
			</chakra.td>
			<chakra.td px="0.75rem" py="0.55rem" color="textSubtle" borderBottom="1px solid" borderColor="bgRaised">
				{year}
			</chakra.td>
			<chakra.td px="0.75rem" py="0.55rem" borderBottom="1px solid" borderColor="bgRaised">
				{links.npm && (
					<TableLink href={links.npm} label="npm" />
				)}
				{links.deployment && (
					<TableLink href={links.deployment} label="open" />
				)}
				{links.repo && (
					<TableLink href={links.repo} label="gh" />
				)}
			</chakra.td>
		</chakra.tr>
	);
}

const TableLink = ({ href, label }: { href: string; label: string }) => (
	<chakra.a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		color="phosphorDim"
		mr="0.5rem"
		transition="color 120ms var(--ease-out), text-shadow 120ms var(--ease-out)"
		_hover={{ color: "phosphor", textShadow: "0 0 6px rgba(123, 192, 137, 0.4)" }}
	>
		{label}
	</chakra.a>
);

export default ProjectRow;
