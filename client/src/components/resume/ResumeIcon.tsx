import { chakra, Box, HStack, Button, Image } from "@chakra-ui/react";
import ResumeCvSvgIcon from "@/assets/resume-cv.svg?react";
import ResumeAsImage from "@/assets/fancy-resume.png";
import React, { useState } from "react";
import ResumeDialogContainer from "./ResumeDialogContainer";
import SquareCVIcon from "@/assets/square-cv-online.svg?react";

function ResumeIcon() {
	const [isDialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<chakra.button
				color="blackAlpha.500"
				py="0.5"
				px="1"
				h="inherit"
				w="min-content"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				{/* <SquareCVIcon
					stroke="currentColor"
					style={{
						maxHeight: "inherit",
						width: "auto",
						height: "24px",
					}}
				/> */}
				<ResumeCvSvgIcon
					fill="currentColor"
					style={{
						maxHeight: "inherit",
						width: "30px",

						height: "inherit",
					}}
				/>
			</chakra.button>

			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
				{/* <Box h="500px" w="200px"></Box> */}
				<Image src={ResumeAsImage} />
			</ResumeDialogContainer>
		</>
	);
}

export default ResumeIcon;
