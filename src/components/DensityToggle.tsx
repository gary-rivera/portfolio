import { useDensity, type Density } from "@hooks/useDensity";

const OPTIONS: Density[] = ["minimal", "normal"];

export default function DensityToggle({ className }: { className?: string }) {
	const [density, setDensity] = useDensity();

	return (
		<span
			role="group"
			aria-label="content density"
			className={className ?? "text-text-subtle"}
		>
			[{" "}
			{OPTIONS.map((label, i) => (
				<span key={label}>
					<button
						type="button"
						onClick={() => setDensity(label)}
						aria-pressed={density === label}
						aria-label={`set density to ${label}`}
						className={
							density === label
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
