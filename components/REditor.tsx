"use client"

import Editor from "@/components/lexical/Editor"
import ChapterActions from "@/components/ui/ChapterActions"


export default function REditor() {
 

   return (
      <>
         <div className="max-w-3xl mx-auto relative bg-white rounded-xl p-8 pb-0">
            <Editor/>
         </div>
         
        

         <ChapterActions/>
      </>
   )
}
