import AdminSideNav from "@/components/AdminSideNav"

export default function StoryLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <AdminSideNav>
            <div className="bg-gray-200 h-full p-4 relative max-w-7xl mx-auto overflow-y-auto">{children}</div>
         </AdminSideNav>
      </>
   )
}
