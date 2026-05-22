type Employer = {
	shortName: string;
	companyName: string;
	description: string;
	url: string;
};

const employers: Record<string, Employer> = {
	orchard: {
		shortName: "Orchard",
		companyName: "Orchard Mortgage",
		description: "Fintech company that simplifies the home buying process from start to finish.",
		url: "https://orchard.com/",
	},
	extra: {
		shortName: "Extra",
		companyName: "Extra Card",
		description:
			"Debit card that helps you build credit, all the while aiming to uplift the financially underserved.",
		url: "https://extra.app/",
	},
	knowCap: {
		shortName: "KnowCap.io",
		companyName: "KnowledgeCaptial",
		description: "Startup Accelerator driving faster MVP development and market entry for early-stage founders.",
		url: "https://www.knowcap.io/",
	},
	numbersApi: {
		shortName: "Numbers API",
		companyName: "Numbers API",
		description: "A free API for trivia facts about numbers.",
		url: "http://numbersapi.com/#42",
	},
	rithmSchool: {
		shortName: "Rithm",
		companyName: "Rithm School",
		description: "Fullstack Coding Bootcamp.",
		url: "https://www.rithmschool.com/",
	},
};

export default employers;
