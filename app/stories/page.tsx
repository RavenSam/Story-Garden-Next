import Link from "next/link"

export default function Stories() {
   return (
      <main>
         <div className="flex items-center justify-center h-[100vh]">
            <div className="text-center">
               <h1 className="text-3xl">Welcome Author</h1>
               <p className="text-slate-500 py-4">Checkout all of your stories</p>
               <Link
                  href="/stories/story/1"
                  className="p-3 w-32 h-32 flex items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
               >
                  Story 1
               </Link>
            </div>
         </div>
      </main>
   )
}
