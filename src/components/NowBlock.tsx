const ITEMS: { text: string; meta?: string }[] = [
	{ text: "shipping the next cut of snaily", meta: "// repo · gary-rivera/flappy-js" },
	{ text: "soldering a 40% split keyboard", meta: "// build #04, fr4 plate, lubed switches" },
	{ text: "reading: the aws pricing docs, again", meta: "// for the third year running" },
	{ text: "open to: senior backend / platform roles", meta: "// nyc, remote, or remote-with-quarterly-onsites" },
];

function NowBlock() {
	return (
		<div className="my-6 border border-dashed border-rule bg-phosphor/[2.5%] px-5 py-4">
			<div className="mb-2 text-xs tracking-wider text-phosphor">
				/etc/now &nbsp;· updated by hand
			</div>
			<ul className="list-none p-0 text-base text-text">
				{ITEMS.map(({ text, meta }) => (
					<li key={text} className="relative flex flex-wrap gap-2 py-1 pl-6">
						<span className="absolute left-0 text-phosphor">→</span>
						<span>{text}</span>
						{meta && <span className="text-xs text-text-subtle">{meta}</span>}
					</li>
				))}
			</ul>
		</div>
	);
}

export default NowBlock;
