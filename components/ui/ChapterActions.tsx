import { TiPlaneOutline, TiClipboard, TiEyeOutline } from "react-icons/ti";
import { TfiCommentAlt } from "react-icons/tfi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal"
import useToggle from "@/hooks/useToggle"


export default function ChapterActions() {
	const { onClose, isOpen, onOpen } = useToggle()

	const commentsHanler = () => console.log("Comments Clicked");

	const notesHanler = () => {
		console.log("Notes Clicked")
		onOpen()
	};

	const FocusMode = () => console.log("Focus Mode Clicked");

	const buttonList = [
		{ label: "Comments", icon: TfiCommentAlt, onClick: commentsHanler },
		{ label: "Notes", icon: TiClipboard, onClick: notesHanler },
		{ label: "Focus mode", icon: TiPlaneOutline, onClick: FocusMode },
	];

	return (
		<>
			<div className="flex flex-col items-center fixed right-4 bottom-4 space-y-2">
				{buttonList.map((el) => (
					<Button
						key={el.label}
						onClick={el.onClick}
						label={el.label}
						tooltip="left"
						btnType="icon"
						variant="ghost"
						className="opacity-60 hover:opacity-100"
					>
						<el.icon />
					</Button>
				))}

				<Modal isOpen={isOpen} onClose={onClose} >
					<h2>It's works</h2>
				</Modal>

			</div>
		</>
	);
}





