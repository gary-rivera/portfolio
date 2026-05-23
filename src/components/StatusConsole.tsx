type Entry = { k: string; v: string; meta?: string; accent?: boolean };

const ENTRIES: Entry[] = [
	{ k: "open_to", v: "frontend / fullstack", meta: "// sf, remote, or remote-w/-quarterly-onsites" },
	{ k: "shipping", v: "snaily v0.4", meta: "// gary-rivera/flappy-js" },
	{ k: "reading", v: "Designing Data-Intensive Applications", meta: "// what AI can't replace" },
];

export default function StatusConsole() {
	return (
		<aside
			className="relative h-fit border border-dashed border-rule bg-phosphor/[2.5%] px-4 py-4"
			aria-labelledby="status-console-head"
		>
			<div id="status-console-head" className="mb-3 flex items-baseline gap-2 text-xs">
				<span className="text-phosphor tracking-wider">~$ status.live</span>
				<span className="text-text-subtle">// updated {__REPO_LAST_PUSHED__}</span>
			</div>

			<dl className="grid grid-cols-1 gap-y-[0.5rem] text-sm">
				{ENTRIES.map(({ k, v, meta, accent }) => (
					<div key={k} className="flex flex-wrap items-baseline gap-x-2">
						<dt className="w-[5.5rem] shrink-0 text-xs text-text-subtle">{k}</dt>
						<dd className="min-w-0 flex-1 text-text">
							<span className={accent ? "text-phosphor" : "text-text"}>{v}</span>
							{meta && <span className="ml-1 text-xs text-text-subtle">{meta}</span>}
						</dd>
					</div>
				))}
			</dl>

		</aside>
	);
}
