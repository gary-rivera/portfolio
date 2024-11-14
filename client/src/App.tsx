import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
import ContactMeIconTray from "./components/ContactMeIconTray";
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
	// TODO: maybe? dynamic pull data from resume-md repo?
	// TODO: maybe? fetch my user info too for overall profile stats (commits, activity charting, etc.)
	// TODO: update repo descriptions and add topics too
	// TODO: find better icons for projects
	// TODO: add company icons to EventCards for extra, orchard, etc.
	// TODO: hover effects apply outline on hyperlinks
	// DONE: icon/button to pop up a modal of resume (use the figma visually appealing version)
	// DONE: socials/contact me icon tray
	// TODO: on page load effect: blur -> focus in of header only (handle api calls in context while this happens)
	// TODO: responsive design -> media querying
	// DONE: make typing headiner cursor match the blue
	// TODO: hook up links for projects + conditional render of icons controller

	// p2
	/*
	DONE: Project Card fine tuning -- spacing/margin/padding:
	[x] badge mapping to color scheme for languages and stack
	[x] format icon sizing by using array for [icon, relativeDimensionSizing]
	[x] bottom HStack as footer (at end of container)
	[x] hover + click effect of project title
	*/
	// DONE: (after context api data management complete) cleanup api.ts and useGithub.ts files
	// TODO: make blinking continue for a half second after typing is complete
	// TODO: add iconRef for height differential on TimelinePath offset (static to 20px rn)
	// NOTE: NOT DOING - sorta undid the overlap UI that I really liked for ExperienceCards. explore how to readd that but without doing so in a hacky way
	// TODO: redo navtab UI for selecting tab. underline on current tab and opaque background too UNTIL other tab is hovered, then animate that opaque background to the hovered tab.
	// TODO: add progress bar to nav tab?

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
		<HStack alignItems="center" zIndex="1" my="5rem" justifyContent="center">
			<Flex direction="column" w="60%">
				<MainHeader />
				{/* <ContactMeIconTray /> */}
				<AcheivementsContainer />

				{/* TODO: rest of social icons */}
			</Flex>
		</HStack>
	);
}

export default App;
