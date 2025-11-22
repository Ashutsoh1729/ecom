"use client";
import SectionHeader from "@/components/page-sections/section-header";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BagActionSection from "./bag-action";
import { useCartItems } from "@/app/(public)/components/cart-context";
import ShoppingBagTable from "./bag-table";
import Link from "next/link";

const BagSections = () => {
  // Syncing the local cart data with the database
  const router = useRouter();
  const dbCartItems = useCartItems();

  const total = dbCartItems.reduce(
    (acc, current) => (acc += current.quantity * current.price),
    0,
  );

  const handleFirstHeaderAction = () => {
    router.push("/");
  };
  // changed the data source, if the dbCartItems exists use it otherwise use the local storage

  return (
    <div>
      <SectionHeader
        name="My Bag"
        hasCTA={true}
        ctaName="continue shopping"
        hasIcon={true}
        IconComponent={ChevronsLeft}
        iconType="leading"
        buttonAction={handleFirstHeaderAction}
      />
      {dbCartItems.length > 0 ? (
        <div>
          <ShoppingBagTable />
          <div id="bag-table" className="mt-12 space-y-4">
            <BagActionSection total={total} />
          </div>
        </div>
      ) : (
        <Link href={"/"}>
          <div className="w-full h-[60vh] bg-slate-100 flex justify-center items-center text-2xl font-medium text-slate-600 mt-6 rounded-md">
            {" "}
            Please Add items to your cart first
          </div>
        </Link>
      )}
    </div>
  );
};

export default BagSections;
