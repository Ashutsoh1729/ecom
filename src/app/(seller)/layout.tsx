import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/(root)/components/sidebar";
import { cookies } from "next/headers";
import { getStoreList, getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";
import ModalManager from "@/components/page-sections/modal-manager";
import {
  AllStoreDataProvider,
  StoreProvider,
} from "./dashboard/(root)/context/store-context";
import { getSellerStoreAllData } from "@/lib/data/products";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
  const userRole = await getUserRole();
  if (userRole == "Buyer") {
    redirect("/");
  }
  const storesList = await getStoreList();
  const allStoreData = await getSellerStoreAllData();

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userRole={userRole} />
        <div className="w-full">
          <SidebarTrigger />
          <AllStoreDataProvider value={allStoreData}>
            <StoreProvider value={storesList}>
              {/* <ProductProvider value={productsList}> */}
              <ModalManager />
              {children}
              {/* </ProductProvider> */}
            </StoreProvider>
          </AllStoreDataProvider>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
