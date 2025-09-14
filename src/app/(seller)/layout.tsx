import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/(root)/components/sidebar";
import { cookies } from "next/headers";
import { getStoreList, getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";
import ModalManager from "@/components/page-sections/modal-manager";
import {
  AllStoreDataProvider,
  ProductProvider,
  StoreProvider,
} from "./dashboard/(root)/context/store-context";
import { getProductList, getSellerStoreAllData } from "@/lib/data/products";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
  const userRole = await getUserRole();
  const storesList = await getStoreList();
  const productsList = await getProductList({ storeList: storesList }); // data is reaching to here in right way
  const allStoreData = await getSellerStoreAllData();
  // console.log(allStoreData);

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userRole={userRole} />
        <div>
          <SidebarTrigger />
          <AllStoreDataProvider value={allStoreData}>
            <StoreProvider value={storesList}>
              <ProductProvider value={productsList}>
                <ModalManager />
                {children}
              </ProductProvider>
            </StoreProvider>
          </AllStoreDataProvider>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
