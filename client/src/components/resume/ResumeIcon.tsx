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
				px="0"
				h="inherit"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				<SquareCVIcon
					stroke="currentColor"
					style={{
						maxHeight: "inherit",
						width: "24px",
						height: "24px",
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
