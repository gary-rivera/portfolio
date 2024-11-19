import { BadgeEntry, projectTagsConfig } from "@/data/projects";

export const getBadgeDetails = (tag: string): BadgeEntry => {
	const badge = projectTagsConfig[tag]?.badge;
	if (badge) {
		return badge;
	}

	return [capitalizeTag(tag), "gray", null];
};

export const capitalizeTag = (tag: string): string => {
	return tag
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
