import { useVerbosity, type Verbosity } from "@hooks/useVerbosity";

const OPTIONS: { label: Verbosity; short: string }[] = [
	{ label: "quiet", short: "q" },
	{ label: "normal", short: "n" },
	{ label: "verbose", short: "v" },
];

export default function VerbosityToggle({ className }: { className?: string }) {
	const [verbosity, setVerbosity] = useVerbosity();

	return (
		<span
			role="group"
			aria-label="content verbosity"
			className={className ?? "text-text-subtle"}
		>
			[{" "}
			{OPTIONS.map(({ label }, i) => (
				<span key={label}>
					<button
						type="button"
						onClick={() => setVerbosity(label)}
						aria-pressed={verbosity === label}
						aria-label={`set verbosity to ${label}`}
						className={
							verbosity === label
								? "cursor-default font-bold uppercase text-text"
								: "cursor-pointer text-text-muted transition-colors duration-150 ease-out hover:text-text"
						}
					>
						{label}
					</button>
					{i < OPTIONS.length - 1 && " · "}
				</span>
			))}{" "}
			]
		</span>
	);
}
