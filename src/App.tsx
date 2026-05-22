import type { CSSProperties, ReactNode } from "react";
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

function LogLine({ i, children }: { i: number; children: ReactNode }) {
	return (
		<div className="log-line" style={{ "--log-i": i } as CSSProperties}>
			{children}
		</div>
	);
}

export default function App() {
	return (
		<>
			<div className="mx-auto max-w-[1080px] px-4 py-6 pb-16 sm:px-6 sm:py-8 md:px-8">
				<LogLine i={0}><TopBar /></LogLine>
				<LogLine i={1}><MainHeader /></LogLine>
				<LogLine i={2}><NowBlock /></LogLine>
				<LogLine i={3}><AcheivementsContainer /></LogLine>
				<LogLine i={4}><PromptBlock /></LogLine>
				<LogLine i={5}><Footer /></LogLine>
			</div>
			<StickyContact />
			<div id="theme-wash" className="theme-wash" aria-hidden="true" />
		</>
	);
}
