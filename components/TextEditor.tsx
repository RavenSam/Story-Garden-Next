"use client"

import React, { useRef, useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import rangy from "rangy/lib/rangy-core"
import "rangy/lib/rangy-classapplier"
import { TiUserAdd } from "react-icons/ti"

const modules = {
   toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],

      ["clean"],
   ],
   clipboard: {
      matchVisual: false,
   },
}



export default function TextEditor() {
   const { quill, quillRef } = useQuill({ modules })
   const [selectBound, setSelectBound] = useState<number | { top: number; left: number, height:number, width:number, words:string[] }>(0)
   let [isOpen, setIsOpen] = useState(false)

   const setApplier = () => {
      rangy
         .createClassApplier("text-red-500", {
            elementTagName: "span",
            elementAttributes: { style: "color:red", "data-char": "character" },
         })
         .toggleSelection()
   }

   useEffect(() => {
      focusQuill()

      if (quillRef?.current) {
         quillRef?.current?.addEventListener("click", focusQuill)
      }

      if (quill) {
         // initciall text
         quill.clipboard.dangerouslyPasteHTML("<h1>React Hook for Quill!</h1>")

         quill.on("selection-change", (range, oldRange, src) => {
            if (range) {
               if (range.length == 0) {
                  // console.log("User cursor is on", range.index)
                  setSelectBound(0)
               } else {
                  var text = quill.getText(range.index, range.length)
                  const bound = quill.getBounds(range.index, range.length)
                  
                  const words = text.split(" ")
                  //console.log(words)
                  
                  setSelectBound({...bound, words})
                  
                  //console.log("User has highlighted", text)
                  //console.log(bound)
               }
            } else {
               // console.log("Cursor not in the editor")
               setSelectBound(0)
            }
         })
      }

      rangy.init()

      function focusQuill() {
         quill?.focus()
      }
   }, [quill, quillRef])

   const popupItems = [
      {
         label: "Link Character",
         icon: TiUserAdd,
         handler: () => {
            setIsOpen(true)
            console.log(isOpen)
         },
      },
      { label: "Link Place", icon: TiUserAdd, handler: () => console.log("Place") },
      { label: "Create Note", icon: TiUserAdd, handler: () => console.log("Note") },
   ]
   //
   return (
      <>
         
      
         
         <div className="mx-auto max-w-2xl">

         
         <div className="quill">
            <div ref={quillRef} />


         {typeof selectBound === "object" ? (
            <div
               style={{ top: selectBound.top - selectBound.height, left: selectBound.left + (selectBound.width / 2), transform:"translate(-50%,-50%)" }}
               className="absolute z-10 flex item-center bg-white rounded-xl border border-gray-300 overflow-hidden"
            >
               {popupItems.map((item) => (
                  <button
                     key={item.label}
                     title={item.label}
                     aria-label={item.label}
                     onClick={item.handler}
                     className="p-3 text-gray-600 hover:bg-slate-200 shadow-2xl hover:text-emerald-500"
                  >
                     <item.icon size={"1.2rem"} />
                  </button>
               ))}
            </div>
         ) : null}

         </div>
         </div>
         
      </>
   )
}



