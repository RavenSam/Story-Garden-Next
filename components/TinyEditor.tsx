"use client"

import { surroundSelection } from "@/utils/TextFunctions"
import React, { useRef, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function TinyEditor() {
   const [value, setValue] = useState("")

   return (
      <>
         <ReactQuill theme="snow" value={value} onChange={setValue} />

         <button type="button" onClick={surroundSelection} className="absolute bottom-10 right-10">
            Surround
         </button>
      </>
   )
}
