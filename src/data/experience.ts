import employers from "@data/employers";

export type CareerEvent = {
	event: string;
	subtitle?: string;
	companyName?: string;
	companyDescription?: string;
	description?: string;
	date: string;
	origin?: string;
	attributes?: { attribute: string; colorScheme: string }[];
	category: "milestone" | "achievement" | "impact";
};

export const events: CareerEvent[] = [
	{
		event: "Cross-platform integration",
		date: "Mar 2024",
		description:
			"wired Extra's customer base into Orchard's mortgage flow. full stack, two teams, one weekend of regret.",
		attributes: [
			{ attribute: "Full stack", colorScheme: "blue" },
			{ attribute: "Integration", colorScheme: "yellow" },
		],
		category: "impact",
	},
	{
		event: "Hired",
		subtitle: employers.orchard.shortName,
		companyName: employers.orchard.companyName,
		companyDescription: employers.orchard.description,
		date: "Feb 2024 → Sep 2024",
		description: "rolled into Orchard after the Extra acquisition. kept the lights on.",
		origin: employers.orchard.url,
		category: "milestone",
	},
	{
		event: "Cloud infrastructure migration",
		date: "Oct 2022 → Jan 2023",
		description:
			"moved production from DigitalOcean to AWS. zero downtime, zero pages, no launch party.",
		category: "impact",
	},
	{
		event: "API security redesign",
		date: "Sep 2022",
		description:
			"built the permissions framework that every internal API call now runs through. one source of truth instead of six.",
		category: "impact",
	},
	{
		event: "Senior Developer",
		subtitle: employers.extra.shortName,
		companyName: employers.extra.companyName,
		companyDescription: employers.extra.description,
		date: "Aug 2022",
		origin: employers.extra.url,
		category: "milestone",
	},
	{
		event: "TypeScript migration",
		date: "Jan 2022",
		description:
			"ported the frontend to TypeScript and rewired the backend to share types end-to-end. fewer prod surprises, faster reviews.",
		category: "impact",
	},
	{
		event: "Revamped signup process",
		date: "Sep 2021",
		description:
			"rebuilt onboarding from the form up. higher completion, cleaner downstream data — finally something marketing could trust.",
		category: "impact",
	},
	{
		event: "Hired",
		subtitle: employers.extra.shortName,
		companyName: employers.extra.companyName,
		companyDescription: employers.extra.description,
		date: "Sep 2021 → Sep 2024",
		origin: employers.extra.url,
		category: "achievement",
		attributes: [{ attribute: "Fintech", colorScheme: "green" }],
	},
	{
		event: "Freelancing",
		subtitle: employers.knowCap.shortName,
		companyName: employers.knowCap.companyName,
		companyDescription: employers.knowCap.description,
		date: "Aug 2021 → Sep 2021",
		origin: employers.knowCap.url,
		category: "achievement",
	},
	{
		event: "Internship",
		subtitle: employers.numbersApi.shortName,
		companyName: employers.numbersApi.companyName,
		companyDescription: employers.numbersApi.description,
		date: "Jul 2021",
		origin: employers.numbersApi.url,
		category: "achievement",
	},
	{
		event: "Completed Schooling",
		subtitle: employers.rithmSchool.shortName,
		companyName: employers.rithmSchool.companyName,
		companyDescription: employers.rithmSchool.description,
		date: "Jul 2021",
		origin: employers.rithmSchool.url,
		category: "achievement",
	},
];
