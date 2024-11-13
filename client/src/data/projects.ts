import ruioIcon from "../assets/ruio-active-logo.png";
import deadlockIcon from "../assets/deadlock-logo.png";
import calculatorIcon from "../assets/calculator-logo.png";
import gbotIcon from "../assets/g-bot-icon.png";
import memeGenieLamp from "../assets/meme-genie-logo.svg";

const GH_USER_LINK = "https://github.com/gary-rivera";
export type Project = {
	logo: string;
	name: string;
	links: {
		npm?: string | null;
		repo?: string | null;
		deployment?: string | null;
	};
	description?: string | null;
	languages?: string[];
	createdAt?: Date;
	totalCommits?: number;
	active: boolean;
};

export type Projects = {
	[key: string]: Project; // Dynamic keys for individual projects
};

export const ProjectCatalog: Projects = {
	ruio: {
		active: true,
		logo: ruioIcon,
		name: "ruio",
		links: {
			npm: "https://www.npmjs.com/package/ruio",
			repo: GH_USER_LINK,
		},
	},
	calculator: {
		active: true,
		logo: calculatorIcon,
		name: "Calculator Mockup",
		links: {
			deployment: "https://gary-rivera.github.io/calculator/",
			repo: GH_USER_LINK,
		},
	},
	gbot: {
		active: true,
		logo: gbotIcon,
		name: "gbot",
		links: {
			npm: null, // TODO: maybe?
			repo: GH_USER_LINK,
		},
	},
	deadlocked: {
		active: true,
		logo: deadlockIcon,
		name: "Deadlock Shop Template",
		links: {
			deployment: null, // TODO: open source + deploy
			repo: GH_USER_LINK,
		},
	},
	"meme-generator": {
		active: true,
		logo: memeGenieLamp,
		name: "Meme Genie",
		links: {
			deployment: "https://gary-rivera.github.io/meme-generator/",
			repo: GH_USER_LINK,
		},
	},
	"flappy-js": {
		active: false,
		logo: memeGenieLamp,
		name: "Flappy Bird",
		links: {
			deployment: "https://gary-rivera.github.io/meme-generator/",
			repo: GH_USER_LINK,
		},
	},
};

// [ text, color, icon]
export type BadgeEntry = [string, string, null];

export const projectBadgesMap: {
	javascript?: BadgeEntry;
	html?: BadgeEntry;
	css?: BadgeEntry;
	typescript?: BadgeEntry;
	python?: BadgeEntry;
	shell?: BadgeEntry;
	[key: string]: BadgeEntry | undefined; // Account for potential dynamic or undefined keys
} = {
	javascript: ["JavaScript", "yellow", null],
	html: ["HTML", "orange", null],
	css: ["CSS", "teal", null],
	typescript: ["TypeScript", "blue", null],
	python: ["Python", "cyan", null],
	shell: ["Shell", "gray", null],
};

export const projectKeys = Object.keys(ProjectCatalog).filter((p) => ProjectCatalog[p].active);
