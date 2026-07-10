import Carat from "@components/Carat";
import type { Chapter, Entry, OnRampItem, Role } from "@data/experience";

function EntryRow({ entry }: { entry: Entry }) {
	return (
		<li
			tabIndex={entry.detail ? 0 : undefined}
			className="wl-entry group grid grid-cols-[1rem_1fr_auto] gap-x-2 px-2 py-[0.3rem] text-sm transition-colors duration-100 ease-out hover:bg-phosphor/[4.5%] focus:bg-phosphor/[4.5%] focus:outline-none sm:gap-x-3"
		>
			<span
				aria-hidden="true"
				className="text-phosphor-dim transition-colors duration-100 ease-out group-hover:text-phosphor group-focus:text-phosphor"
			>
				+
			</span>
			<span className="wl-entry-label min-w-0">{entry.label}</span>
			<span className="self-baseline text-xs text-text-subtle">{entry.year}</span>
			{entry.detail && (
				<span className="wl-detail">
					<span>{entry.detail}</span>
				</span>
			)}
		</li>
	);
}

function RoleGroup({ role, showDates }: { role: Role; showDates: boolean }) {
	return (
		<div>
			<div className="flex flex-wrap items-baseline justify-between gap-x-4">
				<span className="text-sm font-medium text-text">
					{role.title}
					{role.promoted && (
						<>
							<span aria-hidden="true" className="text-phosphor">
								{" "}
								↗
							</span>
							<span className="sr-only"> (promoted)</span>
						</>
					)}
				</span>
				{showDates && role.dates && (
					<span className="text-xs text-text-subtle tabular-nums">{role.dates}</span>
				)}
			</div>
			{role.entries && role.entries.length > 0 && (
				<ul className="-mx-2 mt-0.5 flex flex-col">
					{role.entries.map((entry) => (
						<EntryRow key={entry.label} entry={entry} />
					))}
				</ul>
			)}
		</div>
	);
}

export default function CareerChapter({ chapter, last }: { chapter: Chapter; last?: boolean }) {
	return (
		<li className="wl-chapter relative pb-7 pl-6">
			<span
				aria-hidden="true"
				className={`wl-rail ${chapter.continuous ? "" : "wl-rail--dashed"} ${last ? "wl-rail--fade" : ""}`}
			/>
			<span
				aria-hidden="true"
				className={`wl-node ${chapter.current ? "wl-node--bright" : "wl-node--dim"}`}
			/>

			<header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
				<span className="min-w-0">
					{chapter.url ? (
						<a
							href={chapter.url}
							target="_blank"
							rel="noreferrer"
							className="neon-link text-lg leading-tight"
						>
							{chapter.company.toLowerCase()}
						</a>
					) : (
						<span className="neon-text text-lg leading-tight">
							{chapter.company.toLowerCase()}
						</span>
					)}
					<Carat />
					<span className="text-xs text-text-muted">{chapter.blurb}</span>
				</span>
				<span className="ml-auto text-xs whitespace-nowrap text-text-subtle">
					{chapter.tenure}
					{chapter.duration && ` · ${chapter.duration}`}
				</span>
			</header>

			<div className="mt-2 flex flex-col gap-2">
				{chapter.roles.map((role) => (
					<RoleGroup key={role.title} role={role} showDates={chapter.roles.length > 1} />
				))}
			</div>
		</li>
	);
}

export function OnRamp({ tenure, items }: { tenure: string; items: OnRampItem[] }) {
	return (
		<li className="relative pl-6">
			<span aria-hidden="true" className="wl-node wl-node--hollow" />
			<header className="flex flex-wrap items-baseline gap-x-3">
				<span className="text-lg leading-tight text-text-muted">the on-ramp</span>
				<span className="ml-auto text-xs text-text-subtle">{tenure}</span>
			</header>
			<ul className="-mx-2 mt-0.5 flex flex-col">
				{items.map((item) => (
					<li
						key={`${item.role}-${item.org}`}
						className="wl-entry grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-2 py-[0.3rem]"
					>
						<span className="min-w-0 text-sm text-text">
							{item.role}
							<Carat />
							<a href={item.url} target="_blank" rel="noreferrer" className="neon-link">
								{item.org}
							</a>
						</span>
						<span className="text-xs text-text-subtle tabular-nums">{item.dates}</span>
						<span className="wl-detail wl-detail--full">
							<span>{item.detail}</span>
						</span>
					</li>
				))}
			</ul>
		</li>
	);
}
