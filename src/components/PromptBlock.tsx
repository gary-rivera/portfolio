import { chakra, Box } from "@chakra-ui/react";
import { USER_GITHUB_URL } from "@/components/ContactMeIconTray";

const USER_LINKEDIN_URL = "https://www.linkedin.com/in/gary-a-rivera/";
const USER_EMAIL = "mailto:a.gary.rivera@gmail.com";

function PromptBlock() {
	return (
		<Box
			my="2rem"
			py="1rem"
			borderTop="1px dashed"
			borderBottom="1px dashed"
			borderColor="rule"
			color="textMuted"
			fontSize="12.5px"
		>
			<Line ps1 cmd="whoami --long" />
			<Out>gary rivera. nyc software engineer. backend-leaning, infra-shaped.</Out>
			<Out>solders keyboards. ships small weird named things. writes the year as if it's a log entry.</Out>
			<Box h="0.5rem" />
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
		</Box>
	);
}

type LineProps = { ps1?: boolean; cmd?: string; cursor?: boolean };
const Line = ({ ps1, cmd, cursor }: LineProps) => (
	<Box py="0.15rem">
		{ps1 && (
			<chakra.span color="phosphor">
				<chakra.b fontWeight="700">gary@portfolio</chakra.b>:~$
			</chakra.span>
		)}{" "}
		{cmd && <chakra.span color="text">{cmd}</chakra.span>}
		{cursor && (
			<chakra.span color="phosphor" ml="4px" animation="phosphor-blink 1.1s steps(2) infinite">
				▋
			</chakra.span>
		)}
	</Box>
);

const Out = ({ children }: { children: React.ReactNode }) => (
	<Box pl="2ch" color="textMuted" py="0.05rem">
		{children}
	</Box>
);

const Glow = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<chakra.a
		href={href}
		target={href.startsWith("http") ? "_blank" : undefined}
		rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
		color="phosphor"
		transition="text-shadow 160ms var(--ease-out)"
		_hover={{ textShadow: "0 0 6px rgba(123, 192, 137, 0.5)" }}
	>
		{children}
	</chakra.a>
);

export default PromptBlock;
