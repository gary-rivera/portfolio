import { Global } from "@emotion/react";

const GlobalStyles = () => {
	return (
		<Global
			styles={{
				":root": {
					"--bg": "#0F1310",
					"--bg-raised": "#161B17",
					"--bg-deep": "#0A0C0A",
					"--rule": "#2A302B",
					"--rule-strong": "#4A5249",
					"--text": "#D8E0D6",
					"--text-muted": "#7A8579",
					"--text-subtle": "#4F5650",
					"--phosphor": "#7BC089",
					"--phosphor-dim": "#45684C",
					"--warn": "#D4A24B",
					"--danger": "#D46B4B",
					"--font-mono":
						'"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
					"--ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
					colorScheme: "dark",
					WebkitFontSmoothing: "antialiased",
					MozOsxFontSmoothing: "grayscale",
				},
				"html, body": {
					margin: 0,
					padding: 0,
					minHeight: "100vh",
					background: "var(--bg)",
					color: "var(--text)",
					fontFamily: "var(--font-mono)",
					fontSize: "13px",
					lineHeight: 1.6,
					letterSpacing: 0,
					fontFeatureSettings: '"calt", "ss01"',
				},
				body: {
					position: "relative",
					overflowX: "hidden",
				},
				/* directional ambient light — phosphor top-left, brass bottom-right */
				"body::before": {
					content: '""',
					position: "fixed",
					inset: 0,
					pointerEvents: "none",
					zIndex: 0,
					background: `
						radial-gradient(ellipse 70% 50% at 20% 0%, rgba(123, 192, 137, 0.05), transparent 60%),
						radial-gradient(ellipse 80% 60% at 90% 100%, rgba(212, 162, 75, 0.025), transparent 60%)
					`,
				},
				/* very subtle CRT scanlines */
				"body::after": {
					content: '""',
					position: "fixed",
					inset: 0,
					pointerEvents: "none",
					zIndex: 1,
					backgroundImage: `repeating-linear-gradient(
						0deg,
						rgba(123, 192, 137, 0.018),
						rgba(123, 192, 137, 0.018) 1px,
						transparent 1px,
						transparent 3px
					)`,
				},
				"#root": {
					position: "relative",
					zIndex: 2,
				},
				"*": {
					scrollbarWidth: "thin",
					scrollbarColor: "var(--rule-strong) transparent",
				},
				"*::-webkit-scrollbar": { width: "8px", height: "8px" },
				"*::-webkit-scrollbar-thumb": { background: "var(--rule-strong)", borderRadius: 0 },
				"*::-webkit-scrollbar-track": { background: "transparent" },
				"*::selection": {
					background: "rgba(123, 192, 137, 0.25)",
					color: "var(--text)",
				},
				a: {
					color: "inherit",
					textDecoration: "none",
				},
				"@keyframes phosphor-pulse": {
					"0%, 100%": { opacity: 0.4 },
					"50%": { opacity: 1 },
				},
				"@keyframes phosphor-blink": {
					"50%": { opacity: 0 },
				},
			}}
		/>
	);
};

export default GlobalStyles;
