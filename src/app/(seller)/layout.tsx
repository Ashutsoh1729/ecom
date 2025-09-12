import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/(root)/components/sidebar";
import { cookies } from "next/headers";
import { getStoreList, getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";
import ModalManager from "@/components/page-sections/modal-manager";
import { StoreProvider } from "./dashboard/(root)/context/store-context";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
  const userRole = await getUserRole();
  const storesList = await getStoreList();

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userRole={userRole} />
        <div>
          <SidebarTrigger />
          <StoreProvider value={storesList}>
            <ModalManager />
            {children}
          </StoreProvider>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
