import { chakra } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

interface ProjectIconLinkProps {
	IconTemplate: ReactElement; // or ReactNode
	iconProps?: Record<string, any>;
}

const LinkIconFactory = ({ IconTemplate, iconProps }: ProjectIconLinkProps) => (
	<chakra.a
		href={""}
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
