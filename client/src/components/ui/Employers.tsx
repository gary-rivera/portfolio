import { Image, Icon } from "@chakra-ui/react";

import ExtraLogoMiniSvg from "@/assets/icons/experience/extra-logo-mini.svg?react";
// import ExtraLogoMini from "@/assets/icons/experience/extra-logo-mini.svg?react";
import OrchardLogoMini from "@/assets/icons/experience/orchard-logo-mini.png";
import CompanyAvatarPlaceholderSvg from "@/assets/icons/company-avatar-placeholder.svg?react";

const ExtraIcon = () => (
	<Icon asChild h="18px" w="auto">
		{<ExtraLogoMiniSvg />}
	</Icon>
);
const OrchardIcon = () => (
	<Image
		src={OrchardLogoMini}
		alt="orchard-logo"
		h="18px"
		w="auto"
		border="1px solid rgba(255, 255, 255, 0.5)"
		borderRadius="sm"
		m="0"
		p="0"
	/>
);
const PlaceholderIcon = () => (
	<Icon asChild h="20px" w="auto">
		{<CompanyAvatarPlaceholderSvg />}
	</Icon>
);

const employers = {
	orchard: {
		shortName: "Orchard",
		companyName: "Orchard Mortgage",
		url: "https://orchard.com/",
		icon: <OrchardIcon />,
	},
	extra: {
		shortName: "Extra",
		companyName: "Extra Card",
		url: "https://extra.app/",
		icon: <ExtraIcon />,
	},
	knowCap: {
		shortName: "KnowCap.io",
		companyName: "KnowledgeCaptial",
		url: "https://www.knowcap.io/",
		icon: <PlaceholderIcon />,
	},
	numbersApi: {
		shortName: "Numbers API",
		companyName: "Numbers API",
		url: "http://numbersapi.com/#42",
		icon: <PlaceholderIcon />,
	},
	rithmSchool: {
		shortName: "Rithm",
		companyName: "Rithm School",
		url: "https://www.rithmschool.com/",
		icon: <PlaceholderIcon />,
	},
};

export default employers;
