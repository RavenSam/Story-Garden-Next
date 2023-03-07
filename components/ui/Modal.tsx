import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TiTimes } from "react-icons/ti"

type ModalType = {
	children: ReactNode;
	closeOnClickOutside?: boolean;
	onClose: () => void;
	title: string;
}

function PortalImpl({onClose,children,title,closeOnClickOutside}: ModalType) {
	const modalRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, []);

	useEffect(() => {
		if (modalRef.current !== null) {
			modalRef.current.focus();
		}
	}, []);

	useEffect(() => {
		let modalOverlayElement: HTMLElement | null = null;

		const handler = (event: KeyboardEvent) => {
			if (event.keyCode === 27) {
				onClose();
			}
		};

		const clickOutsideHandler = (event: MouseEvent) => {
			const target = event.target;

			if (
				modalRef.current !== null &&
				!modalRef.current.contains(target as Node) &&
				closeOnClickOutside
			) {
				onClose();
			}
		};

		const modelElement = modalRef.current;
		if (modelElement !== null) {
			modalOverlayElement = modelElement.parentElement;
			if (modalOverlayElement !== null) {
				modalOverlayElement.addEventListener("click", clickOutsideHandler);
			}
		}

		window.addEventListener("keydown", handler);

		return () => {
			window.removeEventListener("keydown", handler);
			if (modalOverlayElement !== null) {
				modalOverlayElement?.removeEventListener(
					"click",
					clickOutsideHandler
				);
			}
		};
	}, [closeOnClickOutside, onClose]);

	return (
		<div className="flex items-center justify-center fixed flex-col inset-0 bg-black/50 z-[100] grow-0 shrink p-2" role="dialog">
			<div 
				style={{ transform: mounted ? "translateY(0)" : "translateY(-50px)", opacity: mounted ? 1 : 0 }} 
				className="p-10 min-h-[100px] w-full max-w-[600px] flex bg-white flex-col relative shadow-6 rounded-xl translate-y-10 transition-all duration-500" 
				tabIndex={-1} 
				ref={modalRef}>

				<button className="absolute right-2 top-2 btn-icon" aria-label="Close modal" onClick={onClose}>
					<TiTimes/>
				</button>

				<h2 className="text-gray-700 m-0 pb-5 border-b border-slate-300 text-xl font-bold">{title}</h2>

				<div className="pt-5">{children}</div>
			</div>
		</div>
	);
}



export default function Modal({onClose,children,title,closeOnClickOutside = false}:ModalType): JSX.Element {
	return createPortal(
		<PortalImpl
			onClose={onClose}
			title={title}
			closeOnClickOutside={closeOnClickOutside}
		>
			{children}
		</PortalImpl>,
		document.body
	);
}
