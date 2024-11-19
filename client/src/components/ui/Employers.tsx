import { Image, Icon } from "@chakra-ui/react";

import ExtraLogoMiniSvg from "@/assets/icons/experience/extra-logo-mini.svg?react";
import OrchardLogoMiniPng from "@/assets/icons/experience/orchard-logo-mini.png";
import CompanyAvatarPlaceholderSvg from "@/assets/icons/company-avatar-placeholder.svg?react";

const ExtraIcon = () => (
	<Icon asChild h="18px" w="auto">
		{<ExtraLogoMiniSvg />}
	</Icon>
);
const OrchardIcon = () => (
	<Image
		src={OrchardLogoMiniPng}
		alt="orchard-logo"
		h="18px"
		w="auto"
		outline="1px solid rgba(255, 255, 255, 0.5)"
		borderRadius="sm"
		m="0"
		p="0"
	/>
);
const PlaceholderIcon = () => (
	<Icon asChild h="18px" w="auto" color="blackAlpha.600">
		{<CompanyAvatarPlaceholderSvg fill="white" />}
	</Icon>
);

const employers = {
	orchard: {
		shortName: "Orchard",
		companyName: "Orchard Mortgage",
		description: "Fintech company that simplifies the home buying process from start to finish.",
		url: "https://orchard.com/",
		icon: <OrchardIcon />,
	},
	extra: {
		shortName: "Extra",
		companyName: "Extra Card",
		description: "Debit card that helps you build credit, all the while aiming to uplift the financially underserved.",
		url: "https://extra.app/",
		icon: <ExtraIcon />,
	},
	knowCap: {
		shortName: "KnowCap.io",
		companyName: "KnowledgeCaptial",
		description: "Startup Accelerator driving faster MVP development and market entry for early-stage founders.",
		url: "https://www.knowcap.io/",
		icon: <PlaceholderIcon />,
	},
	numbersApi: {
		shortName: "Numbers API",
		companyName: "Numbers API",
		description: "A free API for trivia facts about numbers.",
		url: "http://numbersapi.com/#42",
		icon: <PlaceholderIcon />,
	},
	rithmSchool: {
		shortName: "Rithm",
		companyName: "Rithm School",
		description: "Fullstack Coding Bootcamp.",
		url: "https://www.rithmschool.com/",
		icon: <PlaceholderIcon />,
	},
};

export default employers;
