import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ResumeIconDialog.css";
import { createPortal } from "react-dom";
import ResumeCvComponent from "./ResumeCvComponent";

interface DialogProps {
	isOpen?: boolean;
	onClose: () => void;
}

function ResumeDialogContainer({ isOpen, onClose }: DialogProps) {
	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		},
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", onKeyDown);
		}
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	const portalRoot = document.getElementById("dialog-root");
	if (!portalRoot) return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key="resume-modal"
					className="dialog-overlay"
					onClick={onClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
				>
					<motion.div
						className="dialog-content"
						role="dialog"
						aria-modal="true"
						onClick={(e) => e.stopPropagation()}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
					>
						<ResumeCvComponent />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		portalRoot,
	);
}

export default ResumeDialogContainer;
