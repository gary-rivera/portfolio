function TopBar() {
	return (
		<nav className="mb-6 flex items-center justify-between border-b border-dashed border-rule pb-2 text-[11px] tracking-wider text-text-muted lowercase">
			<div className="flex items-center gap-6">
				<span className="text-phosphor">~/gary.rivera</span>
				<span className="text-text-subtle">· portfolio · main</span>
			</div>
			<div className="flex items-center gap-6">
				<span className="text-text-subtle">
					[ <span className="text-text-muted">light</span> ·{" "}
					<b className="font-bold text-text">DARK</b> ]
				</span>
				<div className="flex items-center gap-1.5">
					<div
						className="animate-pulse-phosphor h-1.5 w-1.5 rounded-full bg-phosphor"
						style={{ boxShadow: "0 0 6px var(--phosphor)" }}
					/>
					<span>online · {new Date().toISOString().slice(0, 10)}</span>
				</div>
			</div>
		</nav>
	);
}

export default TopBar;
