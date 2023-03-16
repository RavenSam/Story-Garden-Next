"use client"
import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction, ReactNode } from "react"
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button"
import { BiAtom, BiChevronDown } from "react-icons/bi"
import useToggle from "@/hooks/useToggle"

interface DropProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>,
	containerRef: RefObject<HTMLDivElement>,
	children: ReactNode,
	className?:string,
}

const Drop =({containerRef, setIsOpen, children, className}:DropProps) =>{
	const dropdownRef = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
    const container = containerRef.current;
    const dropdown = dropdownRef.current;

    if (container !== null && dropdown !== null) {
      const { top, left } = container.getBoundingClientRect();
      dropdown.style.top = `${top}px`;
      dropdown.style.left = `${left}px`;
    }
  }, [dropdownRef, containerRef]);

	// Close dropdown when clicked elsewhere
	useEffect(() => {
    const dropdown = dropdownRef.current;
    const container = containerRef.current;

    if (dropdown !== null && container !== null) {
      const handle = (event:any) => {
        const target = event.target;

        if (!dropdown.contains(target) && !container.contains(target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropdownRef, setIsOpen, containerRef]);

	return(

		<div ref={dropdownRef} className={`${className} absolute min-w-[100px] min-h-[100px] bg-white rounded-xl shadow`} >{children}</div>

	)
}

interface DropdownProps {
	children: ReactNode,
	label:string,
	icon?:ReactNode,
	chevron?:boolean,
	btnClassName?:string,
	className?:string
}

export default function Dropdown ({ children, label, icon, chevron=false, btnClassName="", className="" }:DropdownProps) {
	const { isOpen, toggleDrawer, setIsOpen } = useToggle()
	const containerRef = useRef<HTMLDivElement>(null)

	return(
		<>
		<div className="relative" ref={containerRef} >
			<Button onClick={toggleDrawer} btnType="rect" variant="ghost" className={`${btnClassName} border-2 border-black border-solid`} >
				{icon}
				<span>{label || "Label"}</span>
				{chevron ? <BiChevronDown className="text-xl"/> : null}
			</Button>

			{isOpen && createPortal (<Drop containerRef={containerRef} setIsOpen={setIsOpen} className={className} >{children}</Drop>, document.body) }
		</div>
		</>
	)
}