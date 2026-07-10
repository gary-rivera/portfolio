type Props = {
	size?: "xs" | "sm" | "md" | "lg";
	className?: string;
	glow?: boolean;
};

// Same block-character vocabulary as the NameTypingEffect header.
const ASCII = [" ▄▀  █▀█", " ▀▄█ █▀▄"];

const SIZE_CLASS: Record<NonNullable<Props["size"]>, string> = {
	xs: "text-[8px]",
	sm: "text-[10px]",
	md: "text-xs",
	lg: "text-sm",
};

export default function Monogram({ size = "sm", className = "", glow = true }: Props) {
	return (
		<pre
			aria-label="gr"
			className={`m-0 whitespace-pre font-medium leading-none tracking-tight text-phosphor ${SIZE_CLASS[size]} ${
				glow ? "glow-text-phosphor-soft" : ""
			} ${className}`}
		>
			{ASCII.join("\n")}
		</pre>
	);
}
