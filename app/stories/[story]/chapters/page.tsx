import Link from "next/link"

export default function Chapters() {
   return (
      <main>
         <div className="flex items-center justify-center h-[100vh]">
            <div className="text-center">
               <h1 className="text-3xl">Here are all your story chapters</h1>
               <p className="text-slate-500 py-4"></p>

               <div className="">
                  <Link
                     href="/stories/1/chapters/1"
                     className="p-3 w-32 h-16 flex items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                     Chapter 1
                  </Link>
               </div>
            </div>
         </div>
      </main>
   )
}
