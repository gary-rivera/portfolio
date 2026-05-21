import { chakra } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ProjectIconLinkProps {
	IconTemplate: ReactElement;
	iconProps?: Record<string, any>;
}

const LinkIconFactory = ({ IconTemplate, iconProps }: ProjectIconLinkProps) => (
	<chakra.a
		target="_blank"
		rel="noopener noreferrer"
		display="inline-flex"
		alignItems="center"
		justifyContent="center"
		color="textMuted"
		transition="color 200ms var(--ease-out)"
		_hover={{ color: "textPrimary" }}
		{...iconProps}
	>
		{IconTemplate}
	</chakra.a>
);

export default LinkIconFactory;
