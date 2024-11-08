import ruioIcon from '../assets/ruio-active-logo.png'
import deadlockIcon from '../assets/deadlock-logo.png'
import calculatorIcon from '../assets/calculator-logo.png'
import gbotIcon from '../assets/g-bot-icon.png'
import memeGenieLamp from '../assets/meme-genie-logo.svg';

type ProjectLinks = {
	npm?: string | null;
	repo?: string | null;
	deployment?: string | null;
};

type Project = {
	logo: string;
	name: string;
	links: ProjectLinks;
	description?: string | null;
	languages?: string | null; // NOTE: should ultimately be an array
};

type Projects = {
	[key: string]: Project;
};

export const ProjectCatalog: Projects = {
	ruio: {
		logo: ruioIcon,
		name: 'ruio',
		links: {
			npm: 'https://www.npmjs.com/package/ruio',
			repo: null,
		},
	},
	calculator: {
		logo: calculatorIcon,
		name: 'Calculator Mockup',
		links: {
			deployment: 'https://gary-rivera.github.io/calculator/',
			repo: null,
		},
	},
	gbot: {
		logo: gbotIcon,
		name: 'g-bot',
		links: {
			npm: null, // TODO: maybe?
			repo: null,
		},
	},
	deadlocked: {
		logo: deadlockIcon,
		name: 'Deadlock Shop Template',
		links: {
			deployment: null, // TODO: open source + deploy
			repo: null,
		},
	},
	'meme-generator': {
		logo: memeGenieLamp,
		name: 'Meme Genie',
		links: {
			deployment: 'https://gary-rivera.github.io/meme-generator/',
			repo: null,
		},
	},
};