import { TiPlaneOutline, TiClipboard } from "react-icons/ti";
import { TfiCommentAlt } from "react-icons/tfi";

interface Props {
	label: string;
	children?: React.ReactNode;
	onClick: () => void;
}

const ActionButton: React.FC<Props> = ({ children, label, onClick }) => (
	<button
		onClick={onClick}
		aria-label="Focus mode"
		className="relative group btn-icon border border-solid border-black relative opacity-60 hover:opacity-100 hover:shadow-xl"
	>
		{children}

		<span className="absolute text-xs bg-gray-700 rounded-xl w-max shadow-xl text-white p-2 -translate-x-[100%] -left-1 opacity-0 top-1/2 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100 pointer-events-none">
			{label}
		</span>
	</button>
);

export default function ChapterActions() {
	const commentsHanler = () => console.log("Comments Clicked");

	const notesHanler = () => console.log("Notes Clicked");

	const FocusMode = () => console.log("Focus Mode Clicked");

	return (
		<>
			<div className="flex flex-col items-center fixed right-4 bottom-4 space-y-2">
				<ActionButton onClick={commentsHanler} label="Comments">
					<TfiCommentAlt />
				</ActionButton>

				<ActionButton onClick={notesHanler} label="Notes">
					<TiClipboard />
				</ActionButton>

				<ActionButton onClick={FocusMode} label="Focus mode">
					<TiPlaneOutline />
				</ActionButton>
			</div>
		</>
	);
}
