import { chakra } from "@chakra-ui/react";
import { ReactElement } from "react";
import { USER_GITHUB_URL } from "@/components/ContactMeIconTray";
interface ProjectIconLinkProps {
	IconTemplate: ReactElement; // or ReactNode
	iconProps?: Record<string, any>;
}

const LinkIconFactory = ({ IconTemplate, iconProps }: ProjectIconLinkProps) => (
	<chakra.a
		href={USER_GITHUB_URL}
		target="_blank"
		rel="noopener noreferrer"
		display="flex"
		alignItems="center"
		justifyContent="center"
		borderRadius="md"
		color="blackAlpha.600"
		mb="0.5px"
		h="inherit"
		_hover={{
			color: "blackAlpha.950",
		}}
		{...iconProps}
	>
		{IconTemplate}
	</chakra.a>
);

export default LinkIconFactory;
