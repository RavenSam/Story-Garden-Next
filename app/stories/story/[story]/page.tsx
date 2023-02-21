export default function Story({ params }: { params: { story: string } }) {
   const { story } = params

   return (
      <main>
         <div className="flex items-center justify-center h-[100vh]">
            <div className="text-center">
               <h1 className="text-3xl">This is Story {story}</h1>
               <p className="text-slate-500 py-4"></p>
            </div>
         </div>
      </main>
   )
}
