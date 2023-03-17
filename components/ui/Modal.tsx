import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TiTimes } from "react-icons/ti";
import Button from "@/components/ui/Button";

type ModalType = {
	children: ReactNode;
	closeOnClickOutside?: boolean;
	onClose: () => void;
	title?: string;
};

function ModalBody({
	onClose,
	children,
	title,
	closeOnClickOutside,
}: ModalType) {
	const modalRef = useRef<HTMLDivElement>(null);

	// Focus within modal
	useEffect(() => {
		if (modalRef.current !== null) {
			modalRef.current.focus();
		}
	}, []);

	// Close events (Click on overlay to close & onClose func)
	useEffect(() => {
		let modalOverlayElement: HTMLElement | null = null;

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

		const onKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", onKeyPress);

		return () => {
			window.removeEventListener("keydown", onKeyPress);
			if (modalOverlayElement !== null) {
				modalOverlayElement?.removeEventListener(
					"click",
					clickOutsideHandler
				);
			}
		};
	}, [closeOnClickOutside, onClose]);

	return (
		<div
			className="flex items-center justify-center fixed flex-col inset-0 bg-black/50 z-[100] grow-0 shrink p-2"
			role="dialog"
		>
			<div
				className="p-5 min-h-[100px] w-full max-w-[600px] flex bg-white flex-col relative shadow-float rounded-xl"
				tabIndex={-1}
				ref={modalRef}
			>
				<Button
					className="!absolute right-2 top-2"
					variant="ghost"
					btnType="icon"
					label="Close modal"
					onClick={onClose}
				>
					<TiTimes />
				</Button>

				{ title ? <h2 className="text-gray-700 m-0 pb-5 capitalize text-2xl font-bold">
					{title}
				</h2> : null }

				<div className="pt-5">{children}</div>
			</div>
		</div>
	);
}

interface ModalProps extends ModalType {
	isOpen:boolean,
	onOpen?:()=>void
}

export default function Modal({
	onClose,
	children,
	title,
	isOpen,
	closeOnClickOutside = true,
}: ModalProps) {
	return isOpen ? createPortal(
		<ModalBody
			onClose={onClose}
			title={title}
			closeOnClickOutside={closeOnClickOutside}
		>
			{children}
		</ModalBody>,
		document.body
	) : null;
}
