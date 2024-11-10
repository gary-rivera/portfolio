import ruioIcon from '../assets/ruio-active-logo.png'
import deadlockIcon from '../assets/deadlock-logo.png'
import calculatorIcon from '../assets/calculator-logo.png'
import gbotIcon from '../assets/g-bot-icon.png'
import memeGenieLamp from '../assets/meme-genie-logo.svg';

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
	[key: string]: Project;
};

export const ProjectCatalog: Projects = {
	ruio: {
		active: true,
		logo: ruioIcon,
		name: 'ruio',
		links: {
			npm: 'https://www.npmjs.com/package/ruio',
			repo: null,
		},
	},
	calculator: {
		active: true,
		logo: calculatorIcon,
		name: 'Calculator Mockup',
		links: {
			deployment: 'https://gary-rivera.github.io/calculator/',
			repo: null,
		},
	},
	gbot: {
		active: true,
		logo: gbotIcon,
		name: 'gbot',
		links: {
			npm: null, // TODO: maybe?
			repo: null,
		},
	},
	deadlocked: {
		active: true,
		logo: deadlockIcon,
		name: 'Deadlock Shop Template',
		links: {
			deployment: null, // TODO: open source + deploy
			repo: null,
		},
	},
	'meme-generator': {
		active: true,
		logo: memeGenieLamp,
		name: 'Meme Genie',
		links: {
			deployment: 'https://gary-rivera.github.io/meme-generator/',
			repo: null,
		},
	},
	'flappy-js': {
		active: false,
		logo: memeGenieLamp,
		name: 'Flappy Bird',
		links: {
			deployment: 'https://gary-rivera.github.io/meme-generator/',
			repo: null,
		},
	}
};

export const projectKeys = Object.keys(ProjectCatalog)
  .filter(p => ProjectCatalog[p].active)
