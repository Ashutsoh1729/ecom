import Breadcrumb from "@/components/page-sections/breadcrumbs";
import ModalManager from "@/components/page-sections/modal-manager";
import Navbar from "@/components/page-sections/navbar";
import { getAllProduct } from "@/lib/data/products";
import { getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";
import { AllProductProvider } from "./components/context";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const userRole = await getUserRole();
  const allProductData = await getAllProduct();
  // allProductData is reaching to this point

  return (
    <div>
      <ModalManager />
      <AllProductProvider value={allProductData}>
        <SessionProvider>
          <Navbar userRole={userRole} />
        </SessionProvider>
        {/* <Navbar2 /> */}
        <Breadcrumb />

        {children}
      </AllProductProvider>
    </div>
  );
};

export default PublicLayout;
