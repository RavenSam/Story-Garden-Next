import { useState, ReactNode, useEffect } from "react"
import { createPortal } from "react-dom";
import RMDrawer from 'react-modern-drawer'
import { CSSTransition } from 'react-transition-group';


type DrawerType = {
	children?: ReactNode;
	enableOverlay?: boolean;
	toggleDrawer: () => void;
	isOpen:boolean;
	direction?: "right" | "left" | "top" | "bottom";
	className?:string;
}


const DrawerPortal = ({ children, isOpen, toggleDrawer, direction = "right", className, enableOverlay }:DrawerType) =>{

	// Closing via Escape Key
	useEffect(() => {
	  const onKeyPress = (e: KeyboardEvent) => {
	    if (e.key === 'Escape') {
	      toggleDrawer();
	    }
	  }
	  if (isOpen) {
	    window.addEventListener('keyup', onKeyPress);
	  }
	  return () => {
	    window.removeEventListener('keyup', onKeyPress);
	  }
	}, [isOpen, toggleDrawer]);


	return  createPortal(
		<RMDrawer
          open={isOpen}
          onClose={toggleDrawer}
          direction={direction}
          className={className}
          enableOverlay={enableOverlay}
      >
          { children }
      </RMDrawer>,
		document.body
	) 
}


export const Drawer = (props:DrawerType) => {

	return (

	
        <DrawerPortal {... props} >
          {props.children}
        </DrawerPortal>


	)

}


export const useDrawer = () =>{
	const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return { isOpen, toggleDrawer }

}
