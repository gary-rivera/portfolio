import employers from "@/components/Employers";

export type CareerEvent = {
	event: string;
	subtitle?: string;
	companyName?: string;
	companyDescription?: string;
	description?: string;
	date: string;
	origin?: string;
	icon?: any;
	attributes?: { attribute: string; colorScheme: string }[];
	category: "milestone" | "achievement" | "impact"; // NOTE: conditional rendering controller for how the card looks + what values the card is expecting
};

export const events: CareerEvent[] = [
	{
		event: "Cross-platform integration",
		date: "Mar 2024",
		description:
			"Led the full stack development of funneling Extra's customer base into Orchard’s mortgaging services.",
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
		description: "Corporate merger between Extra and Orchard.",
		origin: employers.orchard.url,
		icon: employers.orchard.icon,
		category: "milestone",
	},
	{
		event: "Cloud infrastructure migration",
		date: "Oct 2022 → Jan 2023",
		description: "Assisted in transitioning from DigitalOcean to AWS. Did it with zero down time.",
		category: "impact",
	},
	{
		event: "API security redesign",
		date: "Sep 2022",
		description: "Engineered a permissions framework for all internal API interactions.",
		category: "impact",
	},
	{
		event: "Senior Developer",
		subtitle: employers.extra.shortName,
		companyName: employers.extra.companyName,
		companyDescription: employers.extra.description,
		date: "Aug 2022",

		origin: employers.extra.url,
		icon: employers.extra.icon,
		category: "milestone",
	},
	{
		event: "TypeScript migration",
		date: "Jan 2022",
		description:
			"Converted our frontend to good ol' TypeScript. Also redesigned the backend config to enable shared backend types.",
		category: "impact",
	},
	{
		event: "Revamped signup process",
		date: "Sep 2021",
		description:
			"Pretty significant rework of our signup process to retain more potential applicants and improve CRM insights.",
		category: "impact",
	},
	{
		event: "Hired",
		subtitle: employers.extra.shortName,
		companyName: employers.extra.companyName,
		companyDescription: employers.extra.description,
		date: "Sep 2021 → Sep 2024",
		origin: employers.extra.url,
		icon: employers.extra.icon,
		category: "achievement",
		attributes: [
			{
				attribute: "Fintech",
				colorScheme: "green",
			},
		],
	},
	{
		event: "Freelancing",
		subtitle: employers.knowCap.shortName,
		companyName: employers.knowCap.companyName,
		companyDescription: employers.knowCap.description,
		date: "Aug 2021 → Sep 2021",
		origin: employers.knowCap.url,
		icon: employers.knowCap.icon,
		category: "achievement",
	},
	{
		event: "Internship",
		subtitle: employers.numbersApi.shortName,
		companyName: employers.numbersApi.companyName,
		companyDescription: employers.numbersApi.description,
		date: "Jul 2021",
		origin: employers.numbersApi.url,
		icon: employers.numbersApi.icon,
		category: "achievement",
	},
	{
		event: "Completed Schooling",
		subtitle: employers.rithmSchool.shortName,
		companyName: employers.rithmSchool.companyName,
		companyDescription: employers.rithmSchool.description,
		date: "Jul 2021",
		origin: employers.rithmSchool.url,
		icon: employers.rithmSchool.icon,
		category: "achievement",
	},
];
/*
standout career acheivemnts:
- Add ruio package released on npm as an achievement
- Coding-bootcamp: https://www.notion.so/Coding-Bootcamp-Rithm-ddc02225a16b48a8911d6cebed143ee2
- Numbers API internship: June 2021
- KnowledgeCapital freelancing: Aug 2021 - Sep 2021
- when i started Extra: https://www.notion.so/Hired-Extra-Card-a272e5dfc80c4985a2c217ebc175e0e0
- combine Extra Academy + Backen office hours
- promotion to Core Software Engineer
- promotion to Senior Software Engineer
- assist in database migration from D0 to AWS
- "As part of Extra's aquirement, integrated a pipeline to bridge success-story customers to the Orchard's mortgage platform"
- started a
*/
