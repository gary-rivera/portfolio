import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useTheme } from "@hooks/useTheme";

type Line = { kind: "in" | "out" | "warn" | "ok"; text: ReactNode };

const ABOUT = [
	"gary rivera. nyc software engineer.",
	"backend-leaning, infra-shaped.",
	"solders keyboards. ships small weird named things.",
	"writes the year as if it's a log entry.",
];

const HELP = [
	"  whoami     · about me",
	"  ls         · list sections",
	"  cat <file> · about.md · contact · keyboards",
	"  theme      · toggle theme",
	"  clear      · clear scrollback",
	"  help       · show this",
	"",
	"  (some commands aren't listed.)",
];

const LS = ["about.md  contact  ./projects/  ./keyboards"];

const KEYBOARDS = [
	"current: tofu65 · mx blues · pbt cyrillic legends",
	"(yes the cyrillic legends are on a qwerty layout. long story.)",
];

const CONTACT_TEXT = [
	"→ mailto:a.gary.rivera@gmail.com",
	"→ github.com/gary-rivera",
	"→ linkedin.com/in/gary-a-rivera",
];

const INITIAL: Line[] = [
	{ kind: "in", text: "whoami --long" },
	{ kind: "out", text: "gary rivera. nyc software engineer. backend-leaning, infra-shaped." },
	{ kind: "out", text: "solders keyboards. ships small weird named things." },
	{ kind: "out", text: "" },
	{ kind: "ok", text: "type 'help' for commands. some aren't listed." },
];

export default function PromptBlock() {
	const [history, setHistory] = useState<Line[]>(INITIAL);
	const [input, setInput] = useState("");
	const [stack, setStack] = useState<string[]>([]);
	const [stackIdx, setStackIdx] = useState(-1);
	const [, setTheme] = useTheme();
	const inputRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [history]);

	function append(...lines: Line[]) {
		setHistory((h) => [...h, ...lines]);
	}

	function runCommand(raw: string) {
		const cmd = raw.trim();
		if (!cmd) {
			append({ kind: "in", text: "" });
			return;
		}
		setStack((s) => [cmd, ...s].slice(0, 50));
		setStackIdx(-1);

		const [verb, ...rest] = cmd.split(/\s+/);
		const arg = rest.join(" ");
		const lower = verb.toLowerCase();

		append({ kind: "in", text: cmd });

		switch (lower) {
			case "help":
				HELP.forEach((t) => append({ kind: "out", text: t }));
				break;
			case "whoami":
				ABOUT.forEach((t) => append({ kind: "out", text: t }));
				break;
			case "ls":
				LS.forEach((t) => append({ kind: "out", text: t }));
				break;
			case "cat":
				if (arg === "about.md" || arg === "about") {
					ABOUT.forEach((t) => append({ kind: "out", text: t }));
				} else if (arg === "contact") {
					CONTACT_TEXT.forEach((t) => append({ kind: "out", text: t }));
				} else if (arg === "keyboards" || arg === "./keyboards") {
					KEYBOARDS.forEach((t) => append({ kind: "out", text: t }));
				} else if (arg === "resume.md" || arg === "resume") {
					append({ kind: "warn", text: "// resume on request — try `sudo hire-me`" });
				} else if (arg) {
					append({ kind: "warn", text: `cat: ${arg}: no such file or directory` });
				} else {
					append({ kind: "warn", text: "cat: missing operand" });
				}
				break;
			case "theme":
				append({ kind: "ok", text: "→ toggling theme…" });
				window.setTimeout(() => {
					const current = document.documentElement.getAttribute("data-theme");
					setTheme(current === "dark" ? "light" : "dark");
				}, 80);
				break;
			case "clear":
				setHistory([]);
				break;
			case "keyboards":
				KEYBOARDS.forEach((t) => append({ kind: "out", text: t }));
				break;
			case "sudo":
				if (rest[0]?.toLowerCase() === "hire-me") {
					append({ kind: "ok", text: "[sudo] opening mail composer…" });
					window.setTimeout(() => {
						window.location.href =
							"mailto:a.gary.rivera@gmail.com?subject=%5Bhire%5D%20saw%20your%20terminal";
					}, 280);
				} else {
					append({
						kind: "warn",
						text: `sudo: ${rest.join(" ") || "(no command)"}: command not found`,
					});
				}
				break;
			case "hire-me":
				append({ kind: "warn", text: "permission denied. try `sudo hire-me`." });
				break;
			default:
				append({ kind: "warn", text: `${verb}: command not found · try 'help'` });
		}
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (stack.length === 0) return;
			const next = Math.min(stackIdx + 1, stack.length - 1);
			setStackIdx(next);
			setInput(stack[next] ?? "");
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = stackIdx - 1;
			setStackIdx(next);
			setInput(next < 0 ? "" : stack[next] ?? "");
		}
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		runCommand(input);
		setInput("");
	}

	return (
		<div
			className="my-8 border-y border-dashed border-rule py-4 font-mono text-sm text-text-muted"
			onClick={(e) => {
				if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "DIV") {
					inputRef.current?.focus();
				}
			}}
		>
			<div ref={scrollRef} className="max-h-[18rem] overflow-y-auto pr-1">
				{history.map((line, i) => (
					<LineDisplay key={i} line={line} />
				))}
			</div>
			<form onSubmit={onSubmit} className="mt-1 flex items-center gap-2 py-[0.15rem]">
				<span className="text-phosphor">
					<b className="font-bold">gary@portfolio</b>:~$
				</span>
				<input
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={onKeyDown}
					spellCheck={false}
					autoCapitalize="off"
					autoCorrect="off"
					autoComplete="off"
					aria-label="terminal input"
					className="min-w-0 flex-1 bg-transparent text-text outline-none"
				/>
				<span className="animate-blink-phosphor text-phosphor" aria-hidden="true">▋</span>
			</form>
		</div>
	);
}

function LineDisplay({ line }: { line: Line }) {
	if (line.kind === "in") {
		return (
			<div className="py-[0.15rem]">
				<span className="text-phosphor">
					<b className="font-bold">gary@portfolio</b>:~$
				</span>{" "}
				<span className="text-text">{line.text}</span>
			</div>
		);
	}
	if (line.kind === "warn") {
		return <div className="py-[0.05rem] pl-[2ch] text-warn">{line.text}</div>;
	}
	if (line.kind === "ok") {
		return <div className="py-[0.05rem] pl-[2ch] text-phosphor">{line.text}</div>;
	}
	return <div className="py-[0.05rem] pl-[2ch] text-text-muted">{line.text}</div>;
}
