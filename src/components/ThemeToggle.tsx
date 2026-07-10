import { useTheme, type Theme } from "@hooks/useTheme";

type Props = {
	className?: string;
};

export default function ThemeToggle({ className }: Props) {
	const [theme, setTheme] = useTheme();

	return (
		<span role="group" aria-label="theme" className={className ?? "text-text-subtle"}>
			[{" "}
			<Option
				label="light"
				active={theme === "light"}
				onClick={(e) => setTheme("light", { clientX: e.clientX, clientY: e.clientY })}
			/>{" "}
			·{" "}
			<Option
				label="dark"
				active={theme === "dark"}
				onClick={(e) => setTheme("dark", { clientX: e.clientX, clientY: e.clientY })}
			/>{" "}
			]
		</span>
	);
}

type OptionProps = {
	label: Theme;
	active: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
