import { useState } from "react";
import { Project, projectTagsConfig } from "@data/projects";

interface ProjectCardProps {
	project: Project;
	index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
	const { links, name, description, createdAt, tags, logoConfig, totalCommits } = project;
	const number = (index + 1).toString().padStart(2, "0");
	const year = createdAt ? new Date(createdAt).getFullYear().toString() : null;
	const logoSrc = logoConfig?.[0];

	const topTags = (tags ?? [])
		.map((t) => projectTagsConfig[t]?.badge[0])
		.filter((t): t is string => Boolean(t))
		.slice(0, 3);

	const hasLiveLink = Boolean(links.deployment || links.npm);

	return (
		<article className="group relative grid grid-cols-[28px_1fr] gap-x-3 gap-y-1 border border-dashed border-rule bg-bg-deep/40 px-3 py-3 transition-colors duration-150 ease-out hover:border-phosphor-dim hover:bg-phosphor/[3%] sm:grid-cols-[36px_1fr_auto] sm:px-4 sm:py-3">
			<div className="row-span-2 flex h-7 w-7 items-start justify-center sm:h-9 sm:w-9">
				{logoSrc ? (
					<img
						src={logoSrc}
						alt=""
						width={28}
						height={28}
						loading="lazy"
						decoding="async"
						className="h-7 w-7 object-contain opacity-90 transition-opacity duration-150 ease-out group-hover:opacity-100 sm:h-9 sm:w-9"
					/>
				) : (
					<span className="text-phosphor-dim" aria-hidden="true">▣</span>
				)}
			</div>

			<header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
				<span className="text-text-subtle text-xs">{number}</span>
				<h3 className="text-base font-medium text-text transition-colors duration-150 ease-out group-hover:text-phosphor sm:text-lg">
					{name.toLowerCase()}
				</h3>
				{year && <span className="text-xs text-text-subtle">· {year}</span>}
				{typeof totalCommits === "number" && totalCommits > 0 && (
					<span className="text-xs text-text-subtle">· {totalCommits} commits</span>
				)}
			</header>

			<div className="col-start-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted sm:col-start-2">
				<span className="grow basis-full sm:basis-auto">
					{description ?? <span className="text-text-subtle">—</span>}
				</span>
				{topTags.length > 0 && (
					<span className="flex flex-wrap gap-1">
						{topTags.map((t) => (
							<span
								key={t}
								className="border border-rule px-1.5 py-px text-2xs lowercase tracking-wider text-text-subtle"
							>
								{t}
							</span>
						))}
					</span>
				)}
			</div>

			<div className="col-start-2 mt-1 flex flex-wrap gap-x-3 gap-y-1 sm:col-start-3 sm:row-span-2 sm:mt-0 sm:items-start sm:justify-end">
				{links.deployment && (
					<CardLink href={links.deployment} label={hasLiveLink ? "live" : "open"} prominent name={name} kind="live" />
				)}
				{links.npm && <CardLink href={links.npm} label="npm" name={name} kind="npm" />}
				{links.repo && <CardLink href={links.repo} label="gh" name={name} kind="gh" />}
			</div>
		</article>
	);
}

type CardLinkProps = {
	href: string;
	label: string;
	prominent?: boolean;
	name: string;
	kind: "live" | "npm" | "gh";
};

function CardLink({ href, label, prominent, name, kind }: CardLinkProps) {
	const [flashing, setFlashing] = useState(false);
	const ariaLabels: Record<CardLinkProps["kind"], string> = {
		live: `open ${name} (live)`,
		npm: `${name} on npm`,
		gh: `${name} on github`,
	};
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={ariaLabels[kind]}
			onPointerDown={() => {
				setFlashing(false);
				requestAnimationFrame(() => setFlashing(true));
			}}
			onAnimationEnd={() => setFlashing(false)}
			className={`inline-block px-1.5 py-0.5 text-xs lowercase transition-[color,text-shadow] duration-100 ease-out hover:glow-text-phosphor-soft ${
				prominent
					? "border border-phosphor-dim text-phosphor hover:text-phosphor hover:border-phosphor"
					: "text-phosphor-dim hover:text-phosphor"
			} ${flashing ? "flash-invert" : ""}`}
		>
			{label}
		</a>
	);
}
