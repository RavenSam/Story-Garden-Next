import REditor from "@/components/REditor"


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
