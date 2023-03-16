import { TiPlaneOutline, TiClipboard, TiEyeOutline } from "react-icons/ti";
import { TfiCommentAlt } from "react-icons/tfi";
import Button from "@/components/ui/Button";
// import { useDrawer, Drawer } from "@/components/ui/Drawer"


export default function ChapterActions() {
	// const { toggleDrawer, isOpen } = useDrawer()


	const commentsHanler = () => console.log("Comments Clicked");

	const notesHanler = () => console.log("Notes Clicked");

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
						variant="outline"
						className="opacity-60 hover:opacity-100 hover:shadow-xl"
					>
						<el.icon />
					</Button>
				))}

{/*				<Drawer enableOverlay={true} isOpen={isOpen} toggleDrawer={toggleDrawer} >
					<h2 className="text-3xl">It's works</h2>
				</Drawer>*/}
			</div>
		</>
	);
}





