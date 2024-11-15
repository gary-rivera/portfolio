import { Image, Icon } from "@chakra-ui/react";

import ExtraLogoMiniSvg from "@/assets/icons/experience/extra-logo-mini.svg?react";
// import ExtraLogoMini from "@/assets/icons/experience/extra-logo-mini.svg?react";
import OrchardLogoMini from "@/assets/icons/experience/orchard-logo-mini.png";
import CompanyAvatarPlaceholderSvg from "@/assets/icons/company-avatar-placeholder.svg?react";

const ExtraIcon = () => <Icon asChild>{<ExtraLogoMiniSvg />}</Icon>;
const OrchardIcon = () => <Image src={OrchardLogoMini} alt="project-logo" height="2rem" mt="1" />;
const PlaceholderIcon = () => <Icon asChild>{<CompanyAvatarPlaceholderSvg />}</Icon>;

const employers = {
	orchard: {
		companyName: "Orchard Mortgage",
		url: "https://orchard.com/",
		icon: <OrchardIcon />,
	},
	extra: {
		companyName: "Extra Card",
		url: "https://extra.app/",
		icon: <ExtraIcon />,
	},
	knowCap: {
		companyName: "KnowCap.io",
		url: "https://www.knowcap.io/",
		icon: <PlaceholderIcon />,
	},
	numbersApi: {
		companyName: "Numbers API",
		url: "http://numbersapi.com/#42",
		icon: <PlaceholderIcon />,
	},
	rithmSchool: {
		companyName: "Rithm School",
		url: "https://www.rithmschool.com/",
		icon: <PlaceholderIcon />,
	},
};

export default employers;
