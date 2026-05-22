import MainHeader from "@components/header/MainHeader";
import AcheivementsContainer from "@components/AcheivementsContainer";
import TopBar from "@components/TopBar";
import NowBlock from "@components/NowBlock";
import PromptBlock from "@components/PromptBlock";
import StickyContact from "@components/contact/StickyContact";

function Footer() {
	return (
		<footer className="mt-14 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-rule pt-4 text-xs text-text-subtle">
			<span>nyc · et · 40.6782°N 73.9442°W</span>
			<span className="text-text-muted">
				render: 0.41s · build: 4f3a2c1 · © {new Date().getFullYear()}
			</span>
		</footer>
	);
}

export default function App() {
	return (
		<>
			<div className="mx-auto max-w-[1080px] px-4 py-6 pb-16 sm:px-6 sm:py-8 md:px-8">
				<TopBar />
				<MainHeader />
				<NowBlock />
				<AcheivementsContainer />
				<PromptBlock />
				<Footer />
			</div>
			<StickyContact />
		</>
	);
}
