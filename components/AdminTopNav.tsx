import { TiUserOutline, TiBell } from "react-icons/ti"

export default function AdminTopNav() {
   return (
      <>
         <header className="w-full p-2 pb-0 sticky top-0 left-0 z-20 bg-gray-200 ">
            <div className="rounded-xl bg-white shadow-xl p-3 flex items-center justify-between">
               {/* Right Side */}
               <div className=""></div>

               {/* Left Side */}
               <div className="flex items-center space-x-2">
                  <button aria-label="notification" className="p-2 rounded-xl hover:bg-slate-200">
                     <div className="w-6 h-6">
                        <TiBell size="100%" />
                     </div>
                  </button>
                  <button aria-label="user" className="p-2 rounded-xl hover:bg-slate-200">
                     <div className="w-6 h-6">
                        <TiUserOutline size="100%" />
                     </div>
                  </button>
               </div>
            </div>
         </header>
      </>
   )
}
