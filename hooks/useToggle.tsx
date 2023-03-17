import { useState, useEffect } from "react"


export default function useToggle (){
	const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const onOpen = () => {
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    return { isOpen, toggleDrawer, setIsOpen, onClose, onOpen }

}