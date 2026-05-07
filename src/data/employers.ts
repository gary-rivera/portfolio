import extraLogo from "@/assets/icons/experience/extra-logo-mini.svg";
import orchardLogo from "@/assets/icons/experience/orchard-logo-mini.png";
import companyAvatarPlaceholder from "@/assets/icons/company-avatar-placeholder.svg";

export interface Employer {
	shortName: string;
	companyName: string;
	description: string;
	url: string;
	iconSrc: string;
}

export type EmployerKey = "orchard" | "extra" | "knowCap" | "numbersApi" | "rithmSchool";

export const employers: Record<EmployerKey, Employer> = {
	orchard: {
		shortName: "Orchard",
		companyName: "Orchard Mortgage",
		description: "Fintech company that simplifies the home buying process from start to finish.",
		url: "https://orchard.com/",
		iconSrc: orchardLogo,
	},
	extra: {
		shortName: "Extra",
		companyName: "Extra Card",
		description: "Debit card that helps you build credit, all the while aiming to uplift the financially underserved.",
		url: "https://extra.app/",
		iconSrc: extraLogo,
	},
	knowCap: {
		shortName: "KnowCap.io",
		companyName: "KnowledgeCaptial",
		description: "Startup Accelerator driving faster MVP development and market entry for early-stage founders.",
		url: "https://www.knowcap.io/",
		iconSrc: companyAvatarPlaceholder,
	},
	numbersApi: {
		shortName: "Numbers API",
		companyName: "Numbers API",
		description: "A free API for trivia facts about numbers.",
		url: "http://numbersapi.com/#42",
		iconSrc: companyAvatarPlaceholder,
	},
	rithmSchool: {
		shortName: "Rithm",
		companyName: "Rithm School",
		description: "Fullstack Coding Bootcamp.",
		url: "https://www.rithmschool.com/",
		iconSrc: companyAvatarPlaceholder,
	},
};
