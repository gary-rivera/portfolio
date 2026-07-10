import type { CSSProperties, ReactNode } from "react";
import MainHeader from "@components/header/MainHeader";
import AcheivementsContainer from "@components/AcheivementsContainer";
import TopBar from "@components/TopBar";
import StickyContact from "@components/contact/StickyContact";
import BootSequence from "@components/BootSequence";
import Monogram from "@components/Monogram";
import ThemeToggle from "@components/ThemeToggle";
import { useTimeAwarePhosphor } from "@hooks/useTimeAwarePhosphor";
import { useDynamicTitle } from "@hooks/useDynamicTitle";

function Footer() {
	return (
		<footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-rule pt-4 text-xs text-text-subtle">
			<span>sf · pt · 37.7599°N 122.4148°W</span>
			<div className="flex items-center gap-4">
				<span className="text-text-muted">
					render: 0.41s · build: 4f3a2c1 · © {new Date().getFullYear()}
				</span>
				<Monogram size="sm" />
			</div>
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
	useTimeAwarePhosphor();
	useDynamicTitle();
	return (
		<>
			<BootSequence />
			<a href="#main" className="skip-link">skip to content</a>
			<main id="main" className="mx-auto max-w-[1080px] px-4 py-6 pb-16 sm:px-6 sm:py-8 md:px-8">
				<LogLine i={0}><TopBar /></LogLine>
				<LogLine i={1}>
					<MainHeader />
				</LogLine>
				<LogLine i={2}>
					<div className="mt-10 sm:mt-14">
						<AcheivementsContainer />
					</div>
				</LogLine>
				<LogLine i={4}><Footer /></LogLine>
			</main>
			<StickyContact />
			<aside
				aria-label="display controls"
				className="fixed bottom-6 left-6 z-[5] hidden flex-col items-start gap-2 text-xs tracking-wider text-text-subtle lowercase lg:flex"
			>
				<ThemeToggle />
			</aside>
			<div id="theme-wash" className="theme-wash" aria-hidden="true" />
		</>
	);
}
