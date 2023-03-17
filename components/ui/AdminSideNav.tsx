"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import {
   TiThLargeOutline,
   TiHomeOutline,
   TiFolder,
   TiDocument,
   TiCogOutline,
   TiArrowMaximiseOutline,
} from "react-icons/ti"
import { useContainerDimensions } from "@/hooks/useContainerDimensions"
import Modal from "@/components/ui/Modal"
import useToggle from "@/hooks/useToggle"

const navItems = [
   { title: "Link 1", path: "/", className: "", icon: TiHomeOutline },
   { title: "Link 2", path: "/", className: "", icon: TiThLargeOutline },
   { title: "Link 3", path: "/", className: "", icon: TiFolder },
   { title: "Chapters", path: "/stories/1/chapters", className: "", icon: TiDocument },
]

export default function AdminSideNav({ children }: { children: React.ReactNode }) {
   const componentRef = useRef<HTMLDivElement>(null)
   const [menuOpen, setMenuOpen] = useState(false)
   const { width } = useContainerDimensions(componentRef, menuOpen)

   const toggleMenu = () => {
      if (menuOpen) {
         setMenuOpen(false)
      } else {
         setMenuOpen(true)
      }
   }

   return (
      <>
         {/*  Navbar width: ( w-6 + p-3*2 + mx-3*2 = w-[4.5rem] ) | w-[17rem]  */}
         <div
            style={{ width: menuOpen ? "17rem" : "4.5rem" }}
            ref={componentRef}
            className="absolute top-0 left-0 bottom-0 p-3 bg-white"
         >
            <ul className="space-y-1 flex flex-col h-full">
               <li className="w-full h-36 bg-emerald-300 rounded-xl"></li>
               {navItems.map((item) => (
                  <li key={item.title} className={`${item.className}`}>
                     <Link href={item.path} className="py-3 rounded-xl flex items-center hover:bg-slate-200">
                        <div className="w-6 h-6 mx-3">
                           <item.icon size="100%" />
                        </div>
                        <span className={`${menuOpen ? "block" : "hidden"}`}>{item.title}</span>
                     </Link>
                  </li>
               ))}

               <li className="!mt-auto">
                  <button onClick={toggleMenu} className="py-3 rounded-xl flex items-center hover:bg-slate-200">
                     <div className="w-6 h-6 mx-3">
                        <TiArrowMaximiseOutline size="100%" />
                     </div>
                     <span className=""></span>
                  </button>
               </li>

               <li className="">
                  <EditorSettings menuOpen={menuOpen} />
               </li>
            </ul>
         </div>

         <div
            style={{ left: width + "px" }}
            className="absolute top-0 right-0 bottom-0 transition-all ease-linear overflow-hidden"
         >
            {children}
         </div>
      </>
   )
}


const EditorSettings = ({ menuOpen }: {menuOpen:boolean}) =>{
   const { onClose, isOpen, onOpen } = useToggle()

   return (
      <>
         
      <button onClick={onOpen} className="py-3 rounded-xl flex items-center hover:bg-slate-200">
         <div className="w-6 h-6 mx-3">
            <TiCogOutline size="100%" />
         </div>
         <span className={`${menuOpen ? "block" : "hidden"}`}>Settings</span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title="Settings" >
         <h2>Content Here</h2>
      </Modal>

      </>


    )

}