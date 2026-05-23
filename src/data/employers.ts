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
		description: "home buying, end-to-end. acquired Extra in 2024.",
		url: "https://orchard.com/",
	},
	extra: {
		shortName: "Extra",
		companyName: "Extra Card",
		description: "credit-building debit card. fintech that actually tried to help.",
		url: "https://extra.app/",
	},
	knowCap: {
		shortName: "KnowCap.io",
		companyName: "KnowledgeCapital",
		description: "startup accelerator. shipped MVPs for early-stage founders.",
		url: "https://www.knowcap.io/",
	},
	numbersApi: {
		shortName: "Numbers API",
		companyName: "Numbers API",
		description: "trivia facts about numbers. free. yes, it's real.",
		url: "http://numbersapi.com/#42",
	},
	rithmSchool: {
		shortName: "Rithm",
		companyName: "Rithm School",
		description: "full-stack bootcamp. shipped me into the industry.",
		url: "https://www.rithmschool.com/",
	},
};

export default employers;
