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
			if (event.key === "Escape") {
				onClose();
			}
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

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const contentVariants = {
		hidden: { y: -50, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	const portalRoot = document.getElementById("dialog-root");

	if (!portalRoot) {
		console.error("The element #dialog-root was not found.");
		return null;
	}

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key="resume-modal"
					className="dialog-overlay"
					onClick={onClose}
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<motion.div
						className="dialog-content"
						role="dialog"
						aria-modal="true"
						onClick={(e) => e.stopPropagation()}
						variants={contentVariants}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
