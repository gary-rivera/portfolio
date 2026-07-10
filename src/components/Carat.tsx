type CaratVariant = "phosphor" | "muted";
type CaratSpacing = "tight" | "default" | "wide";

type CaratProps = {
	variant?: CaratVariant;
	spacing?: CaratSpacing;
};

const VARIANT_CLASS: Record<CaratVariant, string> = {
	phosphor: "text-phosphor glow-text-phosphor-soft",
	muted: "text-text-muted",
};

/* em-based so the gap scales with the surrounding font size */
const SPACING_CLASS: Record<CaratSpacing, string> = {
	tight: "mx-[0.25em]",
	default: "mx-[0.5em]",
	wide: "mx-[0.85em]",
};

export default function Carat({ variant = "muted", spacing = "default" }: CaratProps) {
	return (
		<span
			aria-hidden="true"
			className={`inline-block align-middle text-[0.85em] font-bold ${SPACING_CLASS[spacing]} ${VARIANT_CLASS[variant]}`}
		>
			❯
		</span>
	);
}
