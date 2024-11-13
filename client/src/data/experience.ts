export type CareerEvent = {
	title: string;
	subtitle?: string;
	description?: string;
	date: string;
	origin?: string;
	attributes?: { attribute: string; colorScheme: string }[];
	category: "milestone" | "achievement" | "impact"; // NOTE: conditional rendering controller for how the card looks + what values the card is expecting + how it styles them
};
export const experience = [
	"As part of the corporate merger, led the integration of a pipeline to funnel Extra's qualified, success-story customers into Orchard’s mortgage platform.", // full-stack, data-management
	"At ut provident autem et et voluptate enim ut iure maxime impedit. Veniam ducimus assumenda laborum cumque et voluptatem repellat consequatur.At ut provident autem et et voluptate enim ut iure maxime impedit. Veniam ducimus assumenda laborum cumque et voluptatem repellat consequatur.At ut provident autem et et voluptate enim ut iure maxime impedit. Veniam ducimus assumenda laborum cumque et voluptatem repellat consequatur.",
	"Corporis magnam blanditiis culpa qui quisquam sit qui consequuntur dolores. Et reiciendis ratione asperiores.",
	"Minima est sunt qui id est ad placeat aperiam sit aut necessitatibus molestiae placeat. ",
];

export const events: CareerEvent[] = [
	{
		title: "Combine Product Platform",
		date: "Mar 2024",
		description:
			"As part of the corporate merger, led the integration of a pipeline to funnel Extra's qualified, success-story customers into Orchard’s mortgage platform.",
		attributes: [
			{ attribute: "Full stack", colorScheme: "blue" },
			{ attribute: "Integration", colorScheme: "yellow" },
		],
		category: "impact",
	},
	{
		title: "Hired",
		subtitle: "Orchard",
		date: " Feb 2024 → Sep 2024",
		description: experience[0], // TODO: describe that this was a merger situtaion and/or explain the product/service that Orchard provides
		origin: "",
		category: "milestone",
	},
	{
		title: "Permissions Framework", // TODO: hyperlink here
		date: "Sep 2021",
		description:
			"Engineered a permissions framework for API actions, reducing authorization incidents by 80% and enhancing security across platforms.",
		category: "impact",
	},
	{
		title: "Senior Software Developer", // NOTE: Stepped into Senior Dev role
		subtitle: "Extra Card",
		date: "Aug 2022",
		// description: experience[2],
		origin: "",
		category: "milestone",
	},

	{
		title: "Card Journey API util", // TODO: hyperlink here
		date: "Sep 2021",
		description:
			"Built a feature to track user progress in the card journey, boosting conversion rates by 12% and providing real-time insights to reduce support inquiries.",
		category: "impact",
	},
	{
		title: "Hired", // TODO: hyperlink here // TODO: explain the product/service that Extra provides
		date: "Sep 2021 → Sep 2024",
		subtitle: "Extra Card",
		category: "achievement",
		attributes: [
			{
				attribute: "fintech",
				colorScheme: "green",
			},
		],
	},
	{
		title: "Freelancing",
		subtitle: "KnowledgeCapital",
		date: "Aug 2021 → Sep 2021",
		category: "achievement",
	},
	{
		title: "Internship",
		subtitle: "Numbers API",
		date: "Jul 2021",
		category: "achievement",
	},
	{
		title: "Completed schooling",
		subtitle: "Rithm",
		date: "Jul 2021",
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
