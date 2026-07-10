import employers from "@data/employers";

export type Entry = {
	label: string;
	/** revealed on hover/focus */
	detail?: string;
	year: string;
};

export type Role = {
	title: string;
	dates: string;
	/** earned via promotion — rendered with the ↗ rung */
	promoted?: boolean;
	entries?: Entry[];
};

export type Chapter = {
	id: string;
	company: string;
	url: string;
	blurb: string;
	tenure: string;
	duration: string;
	/** brightest node — most recent chapter */
	current?: boolean;
	/** solid rail into the chapter below (continuous employment through the acquisition) */
	continuous?: boolean;
	roles: Role[];
};

export type OnRampItem = {
	role: string;
	org: string;
	url: string;
	dates: string;
	/** revealed on hover/focus */
	detail: string;
};

/** career epoch — jan 1, 2021 */
const CAREER_START = new Date(2021, 0, 1);

/** whole months elapsed since CAREER_START, rendered as "X yrs Y mos" */
export function totalSpan(now = new Date()): string {
	const months =
		(now.getFullYear() - CAREER_START.getFullYear()) * 12 +
		(now.getMonth() - CAREER_START.getMonth());
	const yrs = Math.floor(months / 12);
	const mos = months % 12;
	const parts: string[] = [];
	if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
	if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
	return parts.join(" ") || "0 mos";
}

export const chapters: Chapter[] = [
	{
		id: "hyperfi",
		company: employers.hyperFi.shortName,
		url: employers.hyperFi.url,
		blurb: "llm-assisted telecom procurement",
		tenure: "dec 2025 — present",
		duration: "",
		current: true,
		roles: [
			{
				title: "founding frontend engineer",
				dates: "",
				entries: [
					{
						label: "zero-to-prod web app",
						detail: "empty repo to production in 4 months — react 19 + typescript, routing through ci/cd",
						year: "2026",
					},
					{
						label: "design system",
						detail: "tailwind + shadcn/ui, semantic theming, accessible primitives. no design-to-dev handoff",
						year: "2026",
					},
					{
						label: "ai procurement workflows",
						detail: "multi-step quote flows, supplier marketplace, real-time chat, match-scored suggestions",
						year: "2026",
					},
				],
			},
		],
	},
	{
		id: "orchard",
		company: employers.orchard.shortName,
		url: employers.orchard.url,
		blurb: "home buying, end-to-end",
		tenure: "feb 2024 — sep 2025",
		duration: "",
		continuous: true,
		roles: [
			{
				title: "senior software engineer",
				dates: "feb — sep 2025",
				entries: [
					{
						label: "cross-platform integration",
						detail: "extra's customers, wired into orchard's mortgage flow",
						year: "2025",
					},
				],
			},
		],
	},
	{
		id: "extra",
		company: employers.extra.shortName,
		url: employers.extra.url,
		blurb: "debit to build credit",
		tenure: "sep 2021 — feb 2024",
		duration: "",
		roles: [
			{
				title: "senior software engineer",
				dates: "",
				promoted: true,
				entries: [
					{
						label: "cloud migration",
						detail: "digitalocean → aws, zero downtime",
						year: "2024",
					},
					{
						label: "api security redesign",
						detail: "one permissions layer for every internal api",
						year: "2024",
					},
				],
			},
			{
				title: "core software engineer",
				dates: "",
				entries: [
					{
						label: "typescript migration",
						detail: "shared types, frontend through backend",
						year: "2022",
					},
					{
						label: "signup revamp",
						detail: "rebuilt onboarding; completion up, cleaner data",
						year: "2021",
					},
				],
			},
		],
	},
];

export const onRamp: { tenure: string; items: OnRampItem[] } = {
	tenure: "jul — sep 2021",
	items: [
		{
			role: "freelancing",
			org: "knowcap.io",
			url: employers.knowCap.url,
			dates: "aug — sep 2021",
			detail: employers.knowCap.description,
		},
		{
			role: "internship",
			org: "numbers api",
			url: employers.numbersApi.url,
			dates: "jul 2021",
			detail: employers.numbersApi.description,
		},
		{
			role: "full-stack graduation",
			org: "rithm school",
			url: employers.rithmSchool.url,
			dates: "jun 2021",
			detail: employers.rithmSchool.description,
		},
	],
};
