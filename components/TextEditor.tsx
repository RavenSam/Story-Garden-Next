"use client"

import { surroundSelection } from "@/utils/TextFunctions"
import React, { useRef, useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import { highlightSelection } from "@/utils/highlightSelection"

const modules = {
   toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],

      ["clean"],
   ],
   clipboard: {
      matchVisual: false,
   },
}

//quillRef.state.editor.focus();
export default function TextEditor() {
   const { quill, quillRef } = useQuill({ modules })

   useEffect(() => {
      focusQuill()

      if (quillRef?.current) {
         quillRef?.current?.addEventListener("click", focusQuill)
      }

      function focusQuill() {
         quill?.focus()
      }
   }, [quill, quillRef])

   return (
      <>
         <div className="quill">
            <div ref={quillRef} />
         </div>

         <button className="absolute top-4 right-4  border bg-white border-slate-500 rounded-full h-8 w-8">S</button>
      </>
   )
}
