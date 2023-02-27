"use client"

import React, { useRef, useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import "rangy/lib/rangy-classapplier"
import { TiUserAdd } from "react-icons/ti"
import { MdEditLocationAlt, MdEditNote } from "react-icons/md"
import { IconType } from "react-icons"

const rangy = require("rangy/lib/rangy-core")

type SetBoundType = { top: number; left: number; height: number; width: number; words: string[] }

type PopupItemsType = ({ label: string; icon: IconType; handler: () => void } | null | undefined)[]

const modules = {
   toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, false] }],
      ["link"],
      [{ color: [] }, { background: [] }],

      ["clean"],
   ],
   clipboard: {
      matchVisual: false,
   },
}

export default function TextEditor() {
   const { quill, quillRef } = useQuill({ modules })
   const [selectBound, setSelectBound] = useState<number | SetBoundType>(0)
   const [open, setOpen] = useState(false)

   const setApplier = (markerClass: string, elementAttributes: any) => {
      rangy.createClassApplier(markerClass, { elementAttributes }).toggleSelection()
   }

   useEffect(() => {
      focusQuill()

      if (quillRef?.current) {
         quillRef?.current?.addEventListener("click", focusQuill)
      }

      if (quill) {
         // initciall text
         quill.clipboard.dangerouslyPasteHTML(`<h1>React Hook for Quill! React Hook for Quill!</h1>`)

         quill.on("selection-change", (range, oldRange, src) => {
            if (range) {
               if (range.length == 0) {
                  // console.log("User cursor is on", range.index)
                  setSelectBound(0)
               } else {
                  var text = quill.getText(range.index, range.length)
                  const bound = quill.getBounds(range.index, range.length)

                  const words = text.split(" ").filter((el) => el)
                  //console.log(words)

                  const newBound = words.length > 0 ? { ...bound, words } : 0
                  setSelectBound(newBound)

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

   const linkWords = (linkTo: "character" | "place", dataAt: string | number) => {
      let dataName = `data-${linkTo}`
      setApplier("marked-word", { style: "color:inherit", [dataName]: dataAt })
   }

   const popupItems: PopupItemsType = [
      { label: "Link Character", icon: TiUserAdd, handler: () => setOpen(true) },
      { label: "Link Place", icon: MdEditLocationAlt, handler: () => linkWords("place", "place00001") },
      { label: "Create Note", icon: MdEditNote, handler: () => console.log("Note") },
   ]
      .map((x, i) => {
         if (typeof selectBound === "object") {
            if (!(selectBound.words.length < 5)) {
               return i == 2 ? x : null
            } else {
               return x
            }
         }
      })
      .filter((el) => el)

   return (
      <>
         <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl my-5">Edit Single Chapter</h1>

            <div style={{ display: open ? "block" : "none" }} className="p-8 my-3 bg-green-500 rounded-xl">
               <button className="bg-white/40 p-3" onClick={() => linkWords("character", "chara00001")}>
                  character
               </button>
            </div>

            <div className="quill">
               <div ref={quillRef} />
               {typeof selectBound === "object" ? (
                  <SelectionPop popupItems={popupItems} selectBound={selectBound} />
               ) : null}
            </div>
         </div>
      </>
   )
}

const SelectionPop = ({ popupItems, selectBound }: { popupItems: PopupItemsType; selectBound: SetBoundType }) => (
   <>
      <div
         style={{
            top: selectBound.top - selectBound.height,
            left: selectBound.left + selectBound.width / 2,
            transform: "translate(-50%,-50%)",
         }}
         className="absolute z-10 flex item-center bg-white/90 rounded-xl border border-gray-300 overflow-hidden"
      >
         {popupItems.map((item) => (
            <button
               key={item?.label}
               title={item?.label}
               aria-label={item?.label}
               onClick={item?.handler}
               className="p-3 text-gray-600 hover:bg-slate-200 shadow-2xl hover:text-emerald-500"
            >
               {item && <item.icon size={"1.2rem"} />}
            </button>
         ))}
      </div>
   </>
)
