import { TiUserOutline, TiBell } from "react-icons/ti";
import Button from "@/components/ui/Button"

export default function AdminTopNav() {
   return (
      <>
         <header className="w-full pb-0 sticky top-0 left-0 z-10 bg-gray-200 shadow">
            <div className="bg-white p-2 flex items-center justify-between">
               {/* Right Side */}
               <div className=""></div>

               {/* Left Side */}
               <div className="flex items-center space-x-2">
                  <Button label="notification" btnType="icon" variant="ghost">
                     <TiBell />
                  </Button>
                  <Button label="user" btnType="icon" variant="ghost">
                     <TiUserOutline />
                  </Button>
               </div>
            </div>
         </header>
      </>
   );
}
