import { createSystem, defaultBaseConfig, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const EventCardRecipe = defineRecipe({
	base: {
		w: "auto",
		bg: "rgba(0, 0, 0, 0.035)",
		h: "100%",
		borderColor: "rgba(12,92, 114, 0.2)",
	},
	variants: {
		category: {
			milestone: {
				bg: "rgba(12,92, 114, 0.05)",
				border: "1px solid",
				borderColor: "blue.200",
				color: "blue.800",
			},
			achievement: {
				variant: "elevated",
				// bg: "yellow.400",
				border: "1px solid",
				borderColor: "blue.200",
				color: "blue.800",
				// w: "-moz-min-content",
				h: "-moz-min-content",
				m: 0,
				fontSize: "2xs",
			},
			impact: {
				bg: "red.50",
				border: "1px solid",
				borderColor: "blue.200",
				color: "blue.800",
			},
		},
	},
});

const customConfig = defineConfig({
	// ...defaultBaseConfig,
	theme: {
		tokens: {
			colors: {},
		},
		recipes: {
			eventCard: EventCardRecipe,
		},
	},
	cssVarsRoot: ":where(:root, :host)",
});

export const system = createSystem(defaultConfig, customConfig);
