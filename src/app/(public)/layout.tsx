import Breadcrumb from "@/components/page-sections/breadcrumbs";
import ModalManager from "@/components/page-sections/modal-manager";
import Navbar from "@/components/page-sections/navbar";
import { getAllProduct } from "@/lib/data/products";
import { getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";
import { AllProductProvider } from "./components/context";
import { getCartFromDB } from "@/actions/(public)/user";
import { DbCartItemsProvider } from "./components/cart-context";
import Footer1 from "@/components/page-sections/footer";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const userRole = await getUserRole();
  const allProductData = await getAllProduct();
  const dbCartItems = await getCartFromDB();
  // allProductData is reaching to this point

  return (
    <SessionProvider>
      {" "}
      <div className="h-full">
        <ModalManager />
        <AllProductProvider value={allProductData}>
          <DbCartItemsProvider value={dbCartItems}>
            <SessionProvider>
              <Navbar userRole={userRole} />
            </SessionProvider>
            {/* <Navbar2 /> */}
            <Breadcrumb />

            {children}

            <Footer1 />
          </DbCartItemsProvider>
        </AllProductProvider>
      </div>
    </SessionProvider>
  );
};

export default PublicLayout;
