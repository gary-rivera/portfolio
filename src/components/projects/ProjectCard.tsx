import dayjs from "dayjs";
import { Project } from "@/data/projects";

interface ProjectRowProps {
	project: Project;
	index: number;
}

const TD = "border-b border-bg-raised px-3 py-2";

function ProjectRow({ project, index }: ProjectRowProps) {
	const { links, name, description, createdAt, tags } = project;
	const number = (index + 1).toString().padStart(2, "0");
	const year = createdAt ? dayjs(createdAt).format("YYYY") : "—";
	const stack = (tags && tags.length > 0 ? tags : []).join(" · ");

	return (
		<tr className="group cursor-default transition-colors duration-100 ease-out hover:bg-[rgba(123,192,137,0.045)]">
			<td className={`${TD} text-text-subtle`}>{number}</td>
			<td
				className={`${TD} font-medium text-text transition-colors duration-100 ease-out group-hover:text-phosphor`}
			>
				{name.toLowerCase()}
			</td>
			<td className={`${TD} text-[13px] text-text`}>
				{description ?? <span className="text-text-subtle">—</span>}
			</td>
			<td className={`${TD} text-[13px] text-text-muted`}>
				{stack || <span className="text-text-subtle">—</span>}
			</td>
			<td className={`${TD} text-text-subtle`}>{year}</td>
			<td className={TD}>
				{links.npm && <TableLink href={links.npm} label="npm" />}
				{links.deployment && <TableLink href={links.deployment} label="open" />}
				{links.repo && <TableLink href={links.repo} label="gh" />}
			</td>
		</tr>
	);
}

const TableLink = ({ href, label }: { href: string; label: string }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="mr-2 text-phosphor-dim transition-[color,text-shadow] duration-100 ease-out hover:text-phosphor hover:[text-shadow:0_0_6px_rgba(123,192,137,0.4)]"
	>
		{label}
	</a>
);

export default ProjectRow;
