import { useTheme, type Theme } from "@hooks/useTheme";

type Props = {
	className?: string;
};

function ThemeToggle({ className }: Props) {
	const [theme, setTheme] = useTheme();

	return (
		<span className={className ?? "text-text-subtle"}>
			[{" "}
			<Option label="light" active={theme === "light"} onClick={() => setTheme("light")} /> ·{" "}
			<Option label="dark" active={theme === "dark"} onClick={() => setTheme("dark")} /> ]
		</span>
	);
}

type OptionProps = {
	label: Theme;
	active: boolean;
	onClick: () => void;
};

function Option({ label, active, onClick }: OptionProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			aria-label={`switch to ${label} theme`}
			className={
				active
					? "cursor-default font-bold uppercase text-text"
					: "cursor-pointer text-text-muted transition-colors duration-150 ease-out hover:text-text"
			}
		>
			{label}
		</button>
	);
}

export default ThemeToggle;
