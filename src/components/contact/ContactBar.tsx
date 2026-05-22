import { CONTACT_LINKS } from "@data/contact";
import ContactLink from "./ContactLink";

export default function ContactBar() {
	return (
		<div id="contact-header" className="flex items-center gap-6" aria-label="user info">
			{CONTACT_LINKS.map(({ k, v, href }) => (
				<div key={k} className="flex items-center gap-1.5">
					<span className="text-text-subtle">{k}</span>
					<ContactLink href={href}>{v}</ContactLink>
				</div>
			))}
		</div>
	);
}
