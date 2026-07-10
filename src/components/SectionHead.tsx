type Props = {
	name: string;
	meta?: string;
};

export default function SectionHead({ name, meta }: Props) {
	return (
		<h2 className="mb-[0.9rem] flex items-center gap-3 text-sm font-normal text-text-subtle">
			<span className="text-phosphor">~</span>
			<span className="text-text">{name}</span>
			<span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-rule" />
			{meta && <span className="text-xs">{meta}</span>}
		</h2>
	);
}
