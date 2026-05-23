import ContactBar from "./contact/ContactBar";
import ThemeToggle from "./ThemeToggle";
import VerbosityToggle from "./VerbosityToggle";

export default function TopBar() {
	return (
		<nav className="mb-6 flex flex-wrap items-center justify-between gap-y-2 border-b border-dashed border-rule pb-2 text-xs tracking-wider text-text-muted lowercase">
			<ContactBar />
			<div className="flex flex-wrap items-center gap-x-5 gap-y-1">
				<VerbosityToggle />
				<ThemeToggle />
				<span className="text-text-subtle vrb-decoration">{new Date().toISOString().slice(0, 10)}</span>
			</div>
		</nav>
	);
}
