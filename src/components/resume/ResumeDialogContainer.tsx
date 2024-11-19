import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ResumeIconDialog.css";
import { createPortal } from "react-dom";
import ResumeCvComponent from "./ResumeCvComponent";

interface DialogProps {
	isOpen?: boolean;
	onClose: () => void;
}

function ResumeDialogContainer({ isOpen, onClose }: DialogProps) {
	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", onKeyDown);
		}

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, onClose]);

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
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
						initial={{ y: "-10%", opacity: 0 }}
						animate={{ y: "0", opacity: 1 }}
						exit={{ y: "-50%", opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
					>
						{/* Pass the ref to ResumeLayout */}
						<ResumeCvComponent />
						{/* <HStack mt="4" justifyContent="center">
							<Button colorScheme="blue" onClick={downloadPDF}>
								Download PDF
							</Button>
							<Button variant="outline" onClick={onClose}>
								Close
							</Button>
						</HStack> */}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.getElementById("dialog-root") as HTMLElement,
	);
}

export default ResumeDialogContainer;
