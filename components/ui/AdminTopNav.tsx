import { TiUserOutline, TiBell } from "react-icons/ti";

export default function AdminTopNav() {
   return (
      <>
         <header className="w-full pb-0 sticky top-0 left-0 z-20 bg-gray-200 ">
            <div className="bg-white p-2 flex items-center justify-between">
               {/* Right Side */}
               <div className=""></div>

               {/* Left Side */}
               <div className="flex items-center space-x-2">
                  <button aria-label="notification" className="btn-icon">
                     <TiBell />
                  </button>
                  <button aria-label="user" className="btn-icon">
                     <TiUserOutline />
                  </button>
               </div>
            </div>
         </header>
      </>
   );
}
