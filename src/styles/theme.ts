import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
	theme: {
		tokens: {
			fonts: {
				body: { value: "var(--font-mono)" },
				heading: { value: "var(--font-mono)" },
				mono: { value: "var(--font-mono)" },
			},
			colors: {
				bg: { value: "var(--bg)" },
				bgRaised: { value: "var(--bg-raised)" },
				bgDeep: { value: "var(--bg-deep)" },
				rule: { value: "var(--rule)" },
				ruleStrong: { value: "var(--rule-strong)" },
				text: { value: "var(--text)" },
				textMuted: { value: "var(--text-muted)" },
				textSubtle: { value: "var(--text-subtle)" },
				phosphor: { value: "var(--phosphor)" },
				phosphorDim: { value: "var(--phosphor-dim)" },
				warn: { value: "var(--warn)" },
				danger: { value: "var(--danger)" },
				// legacy aliases kept so any not-yet-migrated callsites still resolve
				surface: { value: "var(--bg)" },
				surfaceRaised: { value: "var(--bg-raised)" },
				surfaceHover: { value: "var(--bg-raised)" },
				hairline: { value: "var(--rule)" },
				hairlineStrong: { value: "var(--rule-strong)" },
				textPrimary: { value: "var(--text)" },
				accent: { value: "var(--phosphor)" },
				accentSoft: { value: "rgba(123, 192, 137, 0.10)" },
				accentDim: { value: "var(--phosphor-dim)" },
			},
			fontSizes: {
				"3xs": { value: "9px" },
				"2xs": { value: "10px" },
				xs: { value: "11px" },
				sm: { value: "12px" },
				md: { value: "13px" },
				lg: { value: "15px" },
				xl: { value: "18px" },
				"2xl": { value: "24px" },
				"3xl": { value: "32px" },
			},
		},
	},
	cssVarsRoot: ":where(:root, :host)",
});

export const system = createSystem(defaultConfig, customConfig);
