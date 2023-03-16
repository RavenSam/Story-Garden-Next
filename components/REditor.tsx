"use client"

import Editor from "@/components/lexical/Editor"
import ChapterActions from "@/components/ui/ChapterActions"


export default function REditor() {
 

   return (
      <>
         <div className="max-w-4xl mx-auto relative bg-white rounded-xl p-8 min-h-screen">
            <Editor/>
         </div>

         <ChapterActions/>
      </>
   )
}
