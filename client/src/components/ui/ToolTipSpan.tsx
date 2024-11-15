import React, { ReactNode } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";

import { tooltipConfig } from "@/utils/tooltipConfig";
import "tippy.js/dist/tippy.css";
import "@/styles/tooltipStyles.css";

interface EmployerEventTooltipProps {
	content: ReactNode;
	children: ReactNode;
	// Spread any other TippyProps that might be useful
	placement?: TippyProps["placement"];
	trigger?: TippyProps["trigger"];
	interactive?: TippyProps["interactive"];

	// Add other props as needed
}

interface TooltipContentProps {
	icon?: React.ReactNode;
	heading?: string;
	text?: string;
	linkIcon?: React.ReactNode;
}

const EmployerEventTooltip: React.FC<EmployerEventTooltipProps> = ({ content, children, ...props }) => {
	return (
		<Tippy content={content} {...tooltipConfig} {...props}>
			<span>{children}</span>
		</Tippy>
	);
};

export default EmployerEventTooltip;
