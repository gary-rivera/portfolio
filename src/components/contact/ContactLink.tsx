import type { ReactNode } from "react";

type ContactLinkProps = {
	href: string;
	children: ReactNode;
	className?: string;
};

function ContactLink({ href, children, className }: ContactLinkProps) {
	const isExternal = href.startsWith("http");
	const base =
		"border-b border-dotted border-transparent pb-px text-text transition-[color,border-color] duration-150 ease-out hover:border-phosphor-dim hover:text-phosphor";
	return (
		<a
			href={href}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			className={className ? `${base} ${className}` : base}
		>
			{children}
		</a>
	);
}

export default ContactLink;
