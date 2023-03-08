import AdminSideNav from "@/components/ui/AdminSideNav"
import AdminTopNav from "@/components/ui/AdminTopNav"

export default function StoryLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <AdminSideNav>
            <div className="bg-gray-200 h-full relative overflow-y-auto">
               <AdminTopNav />
               <div className="mx-auto max-w-7xl">{children}</div>
            </div>
         </AdminSideNav>
      </>
   )
}
