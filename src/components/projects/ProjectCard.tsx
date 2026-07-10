import { useState, type CSSProperties } from "react";
import { Project, projectTagsConfig } from "@data/projects";

export type LifespanAxis = { start: number; end: number };

interface ProjectCardProps {
	project: Project;
	axis: LifespanAxis;
}

const monthLabel = (d: Date) =>
	d.toLocaleString("en-US", { month: "short", year: "numeric" }).toLowerCase();

function pushedAgo(pushed: Date, now: number): string {
	const months = Math.max(0, Math.floor((now - pushed.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
	if (months < 12) return `pushed ${months}mo ago`;
	const y = Math.floor(months / 12);
	const m = months % 12;
	return m ? `pushed ${y}y ${m}mo ago` : `pushed ${y}y ago`;
}

export default function ProjectCard({ project, axis }: ProjectCardProps) {
	const { links, name, kind, description, createdAt, pushedAt, tags, logoConfig, totalCommits } = project;
	const logoSrc = logoConfig?.[0];

	const span = axis.end - axis.start;
	const pos = (d?: Date) =>
		d instanceof Date && span > 0
			? Math.min(100, Math.max(0, ((d.getTime() - axis.start) / span) * 100))
			: null;
	const trackStart = pos(createdAt);
	const trackEnd = pos(pushedAt);
	const hasTrack = trackStart !== null && trackEnd !== null;
	// end-cap brightness: quadratic on the push's position along the axis, so
	// recent work glows and old work cools without a status taxonomy
	const heat = hasTrack ? Math.max(0.08, (trackEnd / 100) ** 2) : 0.08;

	const topTags = (tags ?? []).map((t) => projectTagsConfig[t]?.badge[0] ?? t).slice(0, 3);

	// no date range here — the lifespan track already draws it
	const facts = [
		typeof totalCommits === "number" && totalCommits > 0 ? `${totalCommits} commits` : null,
		pushedAt ? pushedAgo(pushedAt, axis.end) : null,
	].filter(Boolean);

	return (
		<li
			className="pl-strip"
			tabIndex={0}
			style={
				hasTrack
					? ({ "--s": `${trackStart}%`, "--e": `${trackEnd}%`, "--heat": heat } as CSSProperties)
					: ({ "--heat": heat } as CSSProperties)
			}
		>
			<div className="pl-l1">
				{logoSrc && (
					<img
						className="pl-logo"
						src={logoSrc}
						alt=""
						width={16}
						height={16}
						loading="lazy"
						decoding="async"
					/>
				)}
				<a
					className="neon-link pl-name"
					href={links.repo ?? undefined}
					target="_blank"
					rel="noopener noreferrer"
				>
					{name.toLowerCase()}
				</a>
				{kind && <span className="pl-kind">· {kind}</span>}
				<span className="pl-links">
					{links.deployment && (
						<CardLink href={links.deployment} label="demo" name={name} kind="demo" />
					)}
					{links.npm && <CardLink href={links.npm} label="npm" name={name} kind="npm" />}
					{links.repo && <CardLink href={links.repo} label="gh" name={name} kind="gh" />}
				</span>
			</div>

			{topTags.length > 0 ? (
				<ul className="pl-tags" aria-label={`${name} topics`}>
					{topTags.map((tag) => (
						<li key={tag} className="pl-tag">
							{tag.toLowerCase()}
						</li>
					))}
				</ul>
			) : (
				description && <p className="pl-desc">{description}</p>
			)}

			{hasTrack && (
				<div
					className="pl-track"
					role="img"
					aria-label={`lifespan: ${monthLabel(createdAt!)} to ${monthLabel(pushedAt!)}`}
				>
					<span className="pl-bar" />
				</div>
			)}

			{(description || facts.length > 0) && (
				<span className="pl-det">
					<span>
						{description && topTags.length > 0 && <span className="pl-dl">{description}</span>}
						{facts.length > 0 && <span className="pl-dl pl-dl--sub">{facts.join(" · ")}</span>}
					</span>
				</span>
			)}
		</li>
	);
}

type CardLinkProps = {
	href: string;
	label: string;
	name: string;
	kind: "demo" | "npm" | "gh";
};

function CardLink({ href, label, name, kind }: CardLinkProps) {
	const [flashing, setFlashing] = useState(false);
	const ariaLabels: Record<CardLinkProps["kind"], string> = {
		demo: `open ${name} (demo)`,
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
			className={`pl-link ${flashing ? "flash-invert" : ""}`}
		>
			{label}
		</a>
	);
}
