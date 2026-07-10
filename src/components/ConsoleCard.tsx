import type { ReactNode } from "react";

export type ConsoleEntry = {
	k: string;
	v: ReactNode;
	meta?: string;
	accent?: boolean;
};

type Size = "sm" | "md";

type Props = {
	title: string;
	meta?: string;
	entries: ConsoleEntry[];
	size?: Size;
	as?: "section" | "aside";
	className?: string;
};

const ROW: Record<Size, { wrap: string; label: string; value: string; metaSize: string }> = {
	sm: {
		wrap: "flex flex-wrap items-baseline gap-x-2",
		label: "w-[5.5rem] shrink-0 text-xs text-text-subtle",
		value: "min-w-0 flex-1 text-sm text-text",
		metaSize: "text-xs",
	},
	md: {
		wrap: "flex flex-wrap items-baseline gap-x-5 sm:gap-x-6",
		label: "w-[110px] shrink-0 text-sm text-text-subtle sm:w-[140px] sm:text-base",
		value: "min-w-0 flex-1 text-sm text-text sm:text-base",
		metaSize: "text-xs sm:text-sm",
	},
};

const LIST_GAP: Record<Size, string> = {
	sm: "gap-y-[0.5rem]",
	md: "gap-y-[0.4rem]",
};

export default function ConsoleCard({
	title,
	meta,
	entries,
	size = "sm",
	as: Tag = "section",
	className = "",
}: Props) {
	const headId = `console-card-${title.replace(/\W+/g, "-")}`;
	const row = ROW[size];

	return (
		<Tag
			className={`relative h-fit border border-dashed border-rule bg-phosphor/[2.5%] px-4 py-4 ${className}`}
			aria-labelledby={headId}
		>
			<div id={headId} className="mb-3 flex items-baseline gap-2 text-xs">
				<span className="tracking-wider text-phosphor">~$ {title}</span>
				{meta && <span className="text-text-subtle">{meta}</span>}
			</div>

			<dl className={`grid grid-cols-1 ${LIST_GAP[size]}`}>
				{entries.map(({ k, v, meta: entryMeta, accent }) => (
					<div key={k} className={row.wrap}>
						<dt className={row.label}>{k}</dt>
						<dd className={row.value}>
							<span className={accent ? "text-phosphor" : undefined}>{v}</span>
							{entryMeta && (
								<span className={`ml-1 ${row.metaSize} text-text-subtle`}>
									{entryMeta}
								</span>
							)}
						</dd>
					</div>
				))}
			</dl>
		</Tag>
	);
}
