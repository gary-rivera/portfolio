import ruioIcon from "@/assets/icons/projects/ruio-active-logo.png";
import deadlockIcon from "@/assets/icons/projects/deadlock-logo.png";
import calculatorIcon from "@/assets/icons/projects/calculator-logo.png";
import gbotIcon from "@/assets/icons/projects/g-bot-icon.png";
import memeGenieLamp from "@/assets/icons/projects/meme-genie-logo.svg";
import garyFlappyIcon from "@/assets/icons/projects/flappy-js-logo.png";

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
	tags?: string[];
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
		tags: [],
		links: {
			npm: "https://www.npmjs.com/package/ruio",
			repo: GH_USER_LINK,
		},
	},
	calculator: {
		active: true,
		logo: calculatorIcon,
		name: "Calculator",
		tags: [],
		links: {
			deployment: "https://gary-rivera.github.io/calculator/",
			repo: GH_USER_LINK,
		},
	},
	gbot: {
		active: true,
		logo: gbotIcon,
		name: "G-Bot",
		tags: [],
		links: {
			npm: null, // TODO: maybe?
			repo: GH_USER_LINK,
		},
	},
	DeadMart: {
		active: true,
		logo: deadlockIcon,
		tags: [],
		name: "DeadMart",
		links: {
			deployment: null, // TODO: open source + deploy
			repo: GH_USER_LINK,
		},
	},
	"meme-generator": {
		active: true,
		logo: memeGenieLamp,
		tags: [],
		name: "Meme Genie",
		links: {
			deployment: "https://gary-rivera.github.io/meme-generator/",
			repo: GH_USER_LINK,
		},
	},
	"flappy-js": {
		active: true,
		logo: garyFlappyIcon,
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

export const projectBadgesMap: {
	javascript?: BadgeEntry;
	html?: BadgeEntry;
	css?: BadgeEntry;
	typescript?: BadgeEntry;
	python?: BadgeEntry;
	shell?: BadgeEntry;
	[key: string]: BadgeEntry | undefined; // Account for potential dynamic or undefined keys
} = {
	javascript: ["JS", "yellow", null],
	typescript: ["TypeScript", "blue", null],
	"vanilla-js": ["Vanilla JS", "yellow", null],
	html: ["HTML", "orange", null],
	css: ["CSS", "teal", null],
	shell: ["Shell", "gray", null],
	python: ["Python", "cyan", null],
	"developer-tools": ["Developer Tools", "purple", null],
	react: ["React", "blue", null],
	vite: ["Vite", "yellow", null],
	mockup: ["Mockup", "pink", null],
	ai: ["AI", "green", null],
	crypto: ["Crypto", "accent", null],
	gaming: ["Gaming", "red", null],
	"first-project": ["First Project", "gray", null],
};

export const projectCatalogKeys = Object.keys(ProjectCatalog).filter((p) => ProjectCatalog[p].active);
