import REditor from "@/components/REditor"
// import TextEditor from "@/components/TextEditor"

export default function Chapter({ params }: { params: { chapter: string } }) {
   const { chapter } = params

   return (
      <>
         <div className="h-full">
            <REditor />
         </div>
      </>
   )
}
