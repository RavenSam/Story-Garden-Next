"use client"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button"
import { BiAtom } from "react-icons/bi"
import useToggle from "@/hooks/useToggle"

export default function Dropdown () {
	const { isOpen, toggleDrawer } = useToggle()
	

	return(

		<div className="relative" >
			
			<Button  onClick={toggleDrawer} btnType="icon" variant="ghost" >
				<BiAtom/>
			</Button>

			{ isOpen && createPortal (<div className="absolute w-24 h-24 bg-white rounded-xl shadow"></div>, document.body) }
			

		</div>

	)

}