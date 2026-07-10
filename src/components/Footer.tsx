import { useState } from "react";
import Monogram from "@components/Monogram";

export default function Footer() {
	// elapsed from navigation start to this component's first render
	const [renderSec] = useState(() => (performance.now() / 1000).toFixed(2));
	return (
		<footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-rule pt-4 text-xs text-text-subtle">
			<span className="text-text-muted">
				render: {renderSec}s · build: {__GIT_SHA__}
			</span>
			<div className="flex items-center gap-4">
				<span className="text-text-muted">© {new Date().getFullYear()} dingletech</span>
				<Monogram size="sm" />
			</div>
		</footer>
	);
}
