import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/components/sidebar";
import { cookies } from "next/headers";
import { getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
  const userRole = await getUserRole();

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userRole={userRole} />
        <div>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
