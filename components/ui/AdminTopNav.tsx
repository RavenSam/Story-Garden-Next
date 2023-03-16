import { TiUserOutline, TiBell } from "react-icons/ti";
import Button from "@/components/ui/Button"
import Dropdown from "@/components/ui/Dropdown"

export default function AdminTopNav() {
   return (
      <>
         <header className="w-full pb-0 sticky top-0 left-0 z-10">
            <div className="p-2 flex items-center justify-between">
               {/* Right Side */}
               <div className=""></div>

               {/* Left Side */}
               <div className="flex items-center space-x-2">
               {/*<Dropdown/>*/}
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
