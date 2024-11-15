import { chakra, HStack, Button, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import "./ResumeIconDialog.css";
import { createPortal } from "react-dom";
import ResumeAsImage from "@/assets/icons/experience/fancy-resume.png";

// Define dialog props to accept children and an onClose function
interface DialogProps {
	children?: ReactNode;
	isOpen?: boolean;
	onClose: () => void;
}

function ResumeDialogContainer({ children, isOpen, onClose }: DialogProps) {
	useEffect(() => {
		function onKeyDown(event) {
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

	// const dialogVariants = {
	// 	hidden: { scale: 0.8, opacity: 0 },
	// 	visible: { scale: 1, opacity: 1 },
	// };

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
						<Image src={ResumeAsImage} />
						<button className="close-button" onClick={onClose}>
							Close
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.getElementById("dialog-root") as HTMLElement,
	);
}

export default ResumeDialogContainer;
