import Link from "next/link"

const pages = [
   { name: "Stories", path: "/stories" },
   { name: "Story 1", path: "/stories/story/1" },
]

export default function Home() {
   return (
      <main>
         <div className="flex items-center justify-center h-[100vh]">
            <div className="">
               <h1 className="text-3xl">Welcome</h1>
               <p className="text-slate-500 py-4">Here are all the available pages</p>
               <div className="flex items-center  space-x-2">
                  {pages.map((page) => (
                     <Link
                        key={page.name}
                        href={page.path}
                        className="px-5 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                     >
                        {page.name}
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </main>
   )
}
