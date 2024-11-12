export type CareerEvent = {
	title?: string | string[];
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
		date: "Mar 2024",
		title: "Combine Product Platform",
		description:
			"As part of the corporate merger, led the integration of a pipeline to funnel Extra's qualified, success-story customers into Orchard’s mortgage platform.",
		attributes: [
			{ attribute: "Full stack", colorScheme: "blue" },
			{ attribute: "Integration", colorScheme: "yellow" },
		],
		category: "impact",
	},
	{
		date: "Feb 2024",
		title: "Hired @ Orchard",
		description: experience[1], // TODO: describe that this was a merger situtaion and/or explain the product/service that Orchard provides
		origin: "",
		category: "milestone",
	},
	{
		date: "Sep 2021",
		title: "Permissions Framework", // TODO: hyperlink here
		description:
			"Engineered a permissions framework for API actions, reducing authorization incidents by 80% and enhancing security across platforms.",
		category: "impact",
	},
	{
		date: "Aug 2022",
		title: "Senior Software Developer @ Extra Card", // NOTE: Stepped into Senior Dev role
		// description: experience[2],
		origin: "",
		category: "milestone",
	},

	{
		date: "Sep 2021",
		title: "Card Journey API util", // TODO: hyperlink here
		description:
			"Built a feature to track user progress in the card journey, boosting conversion rates by 12% and providing real-time insights to reduce support inquiries.",
		category: "impact",
	},
	{
		date: "Sep 2021",
		title: "Hired @ Extra Card", // TODO: hyperlink here // TODO: explain the product/service that Extra provides
		category: "achievement",
		attributes: [
			{
				attribute: "fintech",
				colorScheme: "green",
			},
		],
	},
	{
		date: "Aug 2021 → Sep. 2021",
		title: "Freelancing @ KnowledgeCapital",
		category: "achievement",
	},
	{
		date: "Jul 2021",
		title: "Internship @ Numbers API",
		category: "achievement",
	},
	{
		date: "Jul 2021",
		title: "Completed schooling @ Rithm",
		category: "achievement",
	},
];

/*
standout career acheivemnts:
- Coding-bootcamp: https://www.notion.so/Coding-Bootcamp-Rithm-ddc02225a16b48a8911d6cebed143ee2
- Numbers API internship: June 2021
- KnowledgeCapital freelancing: Aug 2021 - Sep 2021
- when i started @ Extra: https://www.notion.so/Hired-Extra-Card-a272e5dfc80c4985a2c217ebc175e0e0
- combine Extra Academy + Backend office hours
- promotion to Core Software Engineer
- promotion to Senior Software Engineer
- assist in database migration from D0 to AWS
- "As part of Extra's aquirement, integrated a pipeline to bridge success-story customers to the Orchard's mortgage platform"
- started a
*/
