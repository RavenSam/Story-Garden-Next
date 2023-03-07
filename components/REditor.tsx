"use client"

import Editor from "@/components/lexical/Editor"
import ChapterActions from "@/components/ui/ChapterActions"


export default function REditor() {
 

   return (
      <>
         <div className="max-w-4xl mx-auto mt-36 bg-white">
            <Editor/>
         </div>

         <ChapterActions/>
      </>
   )
}
