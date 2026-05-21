const USER_GITHUB_URL = "https://github.com/gary-rivera";
const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
const USER_EMAIL = "mailto:a.gary.rivera@gmail.com";

function PromptBlock() {
	return (
		<div className="my-8 border-y border-dashed border-rule py-4 text-[12.5px] text-text-muted">
			<Line ps1 cmd="whoami --long" />
			<Out>gary rivera. nyc software engineer. backend-leaning, infra-shaped.</Out>
			<Out>
				solders keyboards. ships small weird named things. writes the year as if it's a log entry.
			</Out>
			<div className="h-2" />
			<Line ps1 cmd="contact" />
			<Out>
				→ <Glow href={USER_EMAIL}>gary@…</Glow>
			</Out>
			<Out>
				→ <Glow href={USER_GITHUB_URL}>github.com/gary-rivera</Glow>
			</Out>
			<Out>
				→ <Glow href={USER_LINKEDIN_URL}>linkedin.com/in/gary-a-rivera</Glow>
			</Out>
			<Out>
				→ <Glow href="#resume">./resume.pdf</Glow>
			</Out>
			<Line ps1 cursor />
		</div>
	);
}

type LineProps = { ps1?: boolean; cmd?: string; cursor?: boolean };
const Line = ({ ps1, cmd, cursor }: LineProps) => (
	<div className="py-[0.15rem]">
		{ps1 && (
			<span className="text-phosphor">
				<b className="font-bold">gary@portfolio</b>:~$
			</span>
		)}{" "}
		{cmd && <span className="text-text">{cmd}</span>}
		{cursor && <span className="animate-blink-phosphor ml-1 text-phosphor">▋</span>}
	</div>
);

const Out = ({ children }: { children: React.ReactNode }) => (
	<div className="py-[0.05rem] pl-[2ch] text-text-muted">{children}</div>
);

const Glow = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<a
		href={href}
		target={href.startsWith("http") ? "_blank" : undefined}
		rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
		className="text-phosphor transition-[text-shadow] duration-150 ease-out hover:[text-shadow:0_0_6px_rgba(123,192,137,0.5)]"
	>
		{children}
	</a>
);

export default PromptBlock;
