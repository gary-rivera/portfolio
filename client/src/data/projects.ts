import ruioIcon from "@/assets/icons/projects/ruio-active-logo.png";
import deadlockIcon from "@/assets/icons/projects/deadlock-logo.png";
import calculatorIcon from "@/assets/icons/projects/calculator-logo.png";
import gbotIcon from "@/assets/icons/projects/g-bot-icon.png";
import memeGenieLamp from "@/assets/icons/projects/meme-genie-logo.svg";
import garyFlappyIcon from "@/assets/icons/projects/flappy-js-logo.png";

const GH_USER_LINK = "https://github.com/gary-rivera";
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

export const ProjectCatalog: Projects = {
	ruio: {
		active: true,

		logoConfig: [
			ruioIcon,
			{
				height: "auto",
				width: ["2rem", "2.5rem", "3rem"],
			},
		],
		name: "ruio",
		tags: [],
		links: {
			npm: "https://www.npmjs.com/package/ruio",
			repo: GH_USER_LINK,
		},
	},
	calculator: {
		active: true,

		logoConfig: [calculatorIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
		name: "Calculator",
		tags: [],
		links: {
			deployment: "https://gary-rivera.github.io/calculator/",
			repo: GH_USER_LINK,
		},
	},
	gbot: {
		active: true,

		logoConfig: [gbotIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
		name: "G-Bot",
		tags: [],
		links: {
			npm: null, // TODO: maybe?
			repo: GH_USER_LINK,
		},
	},
	DeadMart: {
		active: true,

		logoConfig: [deadlockIcon, { height: 100, width: ["1.25rem", "1.5rem", "2rem"] }],
		tags: [],
		name: "DeadMart",
		links: {
			deployment: null, // TODO: open source + deploy
			repo: GH_USER_LINK,
		},
	},
	"meme-generator": {
		active: true,

		logoConfig: [memeGenieLamp, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
		tags: [],
		name: "Meme Genie",
		links: {
			deployment: "https://gary-rivera.github.io/meme-generator/",
			repo: GH_USER_LINK,
		},
	},
	"flappy-js": {
		active: true,

		logoConfig: [garyFlappyIcon, { height: 100, width: ["1.75rem", "1.9em", "2.5rem"] }],
		tags: [],
		name: "Flappy JS",
		links: {
			deployment: "https://gary-rivera.github.io/flappy-js/",
			repo: GH_USER_LINK,
		},
	},
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

export const projectCatalogKeys = Object.keys(ProjectCatalog).filter((p) => ProjectCatalog[p].active);
