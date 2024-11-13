import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Flex } from "@chakra-ui/react";

function App() {
	// p1
	// DONE: deprecate timeline component?
	// DONE: conditional render only active projects
	// DONE: hookup gql to localize repos data fetching as much as possible
	// DONE: move data fetching to context
	// DONE: start API call while page is loading and when experience tab is rendered
	// DONE: ensure API calls are preserved (state vs. context) and don't refetch on tab toggle -- memoize components
	// DONE: repo.languages_url map during data mapping in context
	// DONE: fix only seeing all content after toggling back and forth
	// DONE: prefetch background images within html head
	// DONE: custom timeline component since chakra is ass now
	// DONE: finish experience section UI
	// DONE: Experience tab acceptable-ish state
	// TODO: dynamic pull data from resume-md repo?
	// TODO: maybe? fetch my user info too for overall profile stats (commits, activity charting, etc.)
	// TODO: update repo descriptions and add topics too
	// TODO: add comppany icons to EventCards for extra, orchard, etc.
	// TODO: hover effects apply outline on hyperlinks
	// TODO: icon/button to pop up a modal of resume (use the figma visually appealing version)
	// TODO: socials/contact me icon tray
	// TODO: on page load effect: blur -> focus in of header only (handle api calls in context while this happens)
	// TODO: responsive design -> media querying
	// TODO: make typing headiner cursor match the blue

	// p2
	/*
	DONE: Project Card fine tuning -- spacing/margin/padding:
	[x] badge mapping to color scheme for languages and stack
	[x] format icon sizing by using array for [icon, relativeDimensionSizing]
	[x] bottom HStack as footer (at end of container)
	[x] hover + click effect of project title
	*/
	// DONE: (after context api data management complete) cleanup api.ts and useGithub.ts files
	// TODO: add iconRef for height differential on TimelinePath offset (static to 20px rn)
	// TODO: sorta undid the overlap UI that I really liked for ExperienceCards. explore how to readd that but without doing so in a hacky way

	// p3
	// DONE: scrub though and complete all relevant TODO's leftover
	// DONE: cleanup unused imports
	// DONE: cleanup leftover docu
	// DONE: optimize/improve Performance (g devtools)
	// DONE: remove uneeded box wrapper for Experience and Projects component. hat on hat
	/* NOTE: NOT DOING light/dark mode:
			[ ] complete chakra migration for light/dark mode
			[ ] switch component to toggle between
	*/
	// DONE: remove all `type: any`

	// p4 / maybe nah

	return (
		<HStack alignItems="center" zIndex="1" my="5rem" overflow="hidden" justifyContent="center">
			<Flex direction="column" w="60%">
				<MainHeader />
				<AcheivementsContainer />
				<ColorModeButton w="2rem" />
				{/* TODO: rest of social icons */}
			</Flex>
		</HStack>
	);
}

export default App;
