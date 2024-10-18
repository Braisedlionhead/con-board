import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/siderbar";
// import { OrgSidebar } from "./_components/org-sidebar";
import { OrgSidebar} from "@/app/(dashboard)/_components/org-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}


const DashboardLayout = ({
    children,
} : DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="pl-[60px] h-full">
                {/* gap-x-3导致org-bar右侧有空隙（但它(即将)是透明的 */}
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardLayout; 