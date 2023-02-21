import TinyEditor from "@/components/TinyEditor"

export default function Chapter({ params }: { params: { chapter: string } }) {
   const { chapter } = params

   return (
      <>
         chapter {chapter}
         <div className="h-full">
            <TinyEditor />
         </div>
      </>
   )
}
