type Props = {
	name: string;
	meta?: string;
};

function SectionHead({ name, meta }: Props) {
	return (
		<div className="mb-[0.9rem] flex items-center gap-3 text-sm text-text-subtle">
			<span className="text-phosphor">~</span>
			<span className="text-text">{name}</span>
			<div className="h-px flex-1 border-t border-dashed border-rule" />
			{meta && <span className="text-xs">{meta}</span>}
		</div>
	);
}

export default SectionHead;
