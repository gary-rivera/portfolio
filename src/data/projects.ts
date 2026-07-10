import ruioIcon from "@assets/icons/projects/ruio-active-logo.png";
import deadlockIcon from "@assets/icons/projects/deadlock-logo.png";
import calculatorIcon from "@assets/icons/projects/calculator-logo.png";
import gbotIcon from "@assets/icons/projects/g-bot-icon.png";
import memeGenieLamp from "@assets/icons/projects/meme-genie-logo.svg";
import garyFlappyIcon from "@assets/icons/projects/flappy-js-logo.png";

export const GH_USER_LINK = "https://github.com/gary-rivera";

export type Project = {
	logoConfig: [string, { height: number | string; width: number | string | any[] }];
	name: string;
	links: {
		npm?: string | null;
		repo?: string | null;
		deployment?: string | null;
	};
	description?: string | null;
	languages?: string[];
	tags?: string[];
	createdAt?: Date;
	totalCommits?: number;
	active: boolean;
};

export type Projects = {
	[key: string]: Project;
};

// Logos are local assets and cannot come from GitHub. Keyed by GitHub repo name;
// keys MUST match src/data/projects.registry.json.
export const projectLogos: Record<string, Project["logoConfig"]> = {
	ruio: [ruioIcon, { height: "auto", width: ["2rem", "2.5rem", "3rem"] }],
	"flappy-js": [garyFlappyIcon, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
	"dead-mart": [deadlockIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
	gbot: [gbotIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
	"meme-generator": [memeGenieLamp, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
	calculator: [calculatorIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
};

// [ text, color, icon]
export type BadgeEntry = [string, string, React.ReactNode | null];

type BadgeConfig = [string, string, string | null];
type TagConfig = {
	priority: number;
	badge: BadgeConfig;
};

export const projectTagsConfig: Record<string, TagConfig> = {
	javascript: { priority: 1, badge: ["JavaScript", "yellow", null] },
	typescript: { priority: 1, badge: ["TypeScript", "blue", null] },
	react: { priority: 1, badge: ["React", "blue", null] },
	vite: { priority: 1, badge: ["Vite", "yellow", null] },

	html: { priority: 2, badge: ["HTML", "orange", null] },
	css: { priority: 2, badge: ["CSS", "teal", null] },
	shell: { priority: 2, badge: ["Shell", "gray", null] },
	python: { priority: 2, badge: ["Python", "cyan", null] },
	"developer-tools": { priority: 2, badge: ["Developer Tools", "purple", null] },

	mockup: { priority: 3, badge: ["Mockup", "purple", null] },
	ai: { priority: 3, badge: ["AI", "green", null] },
	gaming: { priority: 3, badge: ["Gaming", "red", null] },

	"first-project": { priority: 4, badge: ["First Project", "gray", null] },
};
