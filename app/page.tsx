import Link from "next/link";
import Button from "@/components/ui/Button";
import { TiHeartOutline } from "react-icons/ti"

const pages = [
   { name: "Stories", path: "/stories" },
   { name: "Story 1", path: "/stories/1" },
];

export default function Home() {
   return (
      <main>
         <div className="flex items-center justify-center h-[100vh]">
            <div className="">
               <h1 className="text-3xl">Welcome</h1>

               <p className="text-slate-500 py-4">
                  Here are all the available pages
               </p>
               <div className="flex items-center  space-x-2">
                  {pages.map((page) => (
                     <Button key={page.name} href={page.path} colorScheme="primary">
                        {page.name}
                     </Button>
                  ))}
               </div>
               <hr className="my-4" />
               <div className="flex items-center mt-10 space-x-2">
                  <Button>Black</Button>
                  <Button colorScheme="primary">Primary</Button>
                  <Button colorScheme="danger">Red</Button>
                  <Button colorScheme="warning">Orange</Button>
               </div>
               <div className="flex items-center mt-5 space-x-2">
                  <Button variant="outline" >Black</Button>
                  <Button variant="outline" colorScheme="primary">Primary</Button>
                  <Button variant="outline" colorScheme="danger">Red</Button>
                  <Button variant="outline" colorScheme="warning">Orange</Button>
               </div>
               <div className="flex items-center mt-5 space-x-2">
                  <Button variant="ghost" >Black</Button>
                  <Button variant="ghost" colorScheme="primary">Primary</Button>
                  <Button variant="ghost" colorScheme="danger">Red</Button>
                  <Button variant="ghost" colorScheme="warning">Orange</Button>
               </div>
               <div className="flex items-center mt-5 space-x-2">
                  <Button btnType="rect">Black</Button>
                  <Button btnType="rect" colorScheme="primary">Primary</Button>
                  <Button btnType="rect" colorScheme="danger">Red</Button>
                  <Button btnType="rect" colorScheme="warning">Orange</Button>
               </div>
               <div className="flex items-center justify-around mt-5 space-x-2">
                  <Button btnType="icon" variant="outline"><TiHeartOutline/></Button>
                  <Button btnType="icon" variant="outline" colorScheme="primary"><TiHeartOutline/></Button>
                  <Button btnType="icon" variant="outline" colorScheme="danger"><TiHeartOutline/></Button>
                  <Button btnType="icon" variant="outline" colorScheme="warning"><TiHeartOutline/></Button>
               </div>
            </div>
         </div>
      </main>
   );
}
