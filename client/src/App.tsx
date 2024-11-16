import { useState, useEffect } from "react";
import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
import ContactMeIconTray from "./components/ContactMeIconTray";
import { HStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

// p1 aka mandatory for today
// TODO: responsive design -> media querying
// TODO: make resume in code

// p2 aka mandatory for release
// TODO: update repo descriptions and add topics too
// TODO: hook up links for projects + conditional render of icons controller
// TODO: find/make better icons for projects (outsource?)
// TODO: localStorage/cache/token for onload animation -- easter egg

// p3 aka low hanging fruit
// TODO: add some flare/love to the ProjectCard's. Feels lacking in comparison
// TODO: remove all `type: any`
// TODO: add iconRef for height differential on TimelinePath offset (static to 20px rn)
// TODO: assets/icons cleanup or optimize?
// TODO: HAVE TO -_- redo navtab UI for selecting tab. underline on current tab and opaque background too UNTIL other tab is hovered, then animate that opaque background to the hovered tab.
// TODO: memoize the tabs content so that it doesn't rerender on tab switch

// maybe/graveyard
// TODO: add progress bar to nav tab?
// TODO: gradient on top or bottom (or both?) of the achievement container so that content isnt so suddenly cut off
// TODO: maybe? dynamic pull data from resume-md repo?
// TODO: maybe? fetch my user info too for overall profile stats (commits, activity charting, etc.)
// NOTE: NOT DOING - sorta undid the overlap UI that I really liked for ExperienceCards. explore how to readd that but without doing so in a hacky way

/* NOTE: NOT DOING light/dark mode:
			[ ] complete chakra migration for light/dark mode
			[ ] switch component to toggle between
	*/

function App() {
	const [isLoadingAnimationComplete, setIsLoadingAnimationComplete] = useState(false);
	const [loadRest, setLoadRest] = useState(false);

	useEffect(() => {
		if (isLoadingAnimationComplete) {
			console.log("[app] header animations signaled as complete");
			setTimeout(() => setLoadRest(true), 100);
		}
	}, [isLoadingAnimationComplete]);

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const staggerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.35,
			},
		},
	};

	return (
		<HStack
			alignItems="center"
			zIndex="1"
			my={["2rem", "3rem", "4rem", "5rem"]}
			justifyContent="center"
			w="100vw"
			px={["1rem", "1.5rem", "2rem", "3rem"]}
		>
			<Flex direction="column" w="100%" maxW="1000px">
				<MainHeader
					isLoadingAnimationComplete={isLoadingAnimationComplete}
					setIsLoadingAnimationComplete={setIsLoadingAnimationComplete}
				/>
				{loadRest && (
					<motion.div variants={staggerVariants} initial="hidden" animate="visible" style={{ width: "100%" }}>
						<motion.div variants={containerVariants} style={{ marginBottom: "2rem" }}>
							<AcheivementsContainer />
						</motion.div>
						<motion.div variants={containerVariants}>
							<ContactMeIconTray />
						</motion.div>
					</motion.div>
				)}
			</Flex>
		</HStack>
	);
}

export default App;
