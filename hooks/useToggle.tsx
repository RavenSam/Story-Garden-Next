import { useState, useEffect } from "react"


export default function useToggle (){
	const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return { isOpen, toggleDrawer }

}