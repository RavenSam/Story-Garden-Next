"use client"

import { surroundSelection } from "@/utils/TextFunctions"
import React, { useRef, useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import { highlightSelection } from "@/utils/highlightSelection"
import rangy from "rangy/lib/rangy-core"
import "rangy/lib/rangy-classapplier"


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

//quillRef.state.editor.focus();
export default function TextEditor() {
   const { quill, quillRef } = useQuill({ modules })

   let applier

   const setApplier = () => {
      rangy.createClassApplier("text-red-500", { elementTagName: "span", elementAttributes:{style:"color:red"} }).toggleSelection()
   }

   useEffect(() => {
      focusQuill()

      if (quillRef?.current) {
         quillRef?.current?.addEventListener("click", focusQuill)
      }

      rangy.init()

      function focusQuill() {
         quill?.focus()
      }

     
   }, [quill, quillRef])

   return (
      <>
         <p>Please work</p>

         <div className="quill">
            <div ref={quillRef} />
         </div>

         <button
            onClick={setApplier}
            className="absolute top-4 right-4  border bg-white border-slate-500 rounded-full h-8 w-8"
         >
            S
         </button>
      </>
   )
}

// var theDiv = document.getElementById('pageFrame');
// theDiv.contentEditable = true;

// document.getElementById('clickNode').onmousedown = ( function() {
//    addTheNode();
// });

// function addTheNode()
// {
// rangy.init();

// var range = rangy.getSelection().getRangeAt(0);

// alert(range);

//     var newNode = document.createElement("code");
// 				newNode.className = "code";
// 				newNode.contentEditable = false;
//                 newNode.innerHTML = "&nbsp";
// 				range.insertNode(newNode);

// }
