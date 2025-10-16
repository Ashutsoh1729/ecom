"use client";
import SectionHeader from "@/components/page-sections/section-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsLeft, Dot, Ellipsis, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItemType } from "@/app/(public)/lib/cart-schema";
import BagActionSection from "./bag-action";
import { Button } from "@/components/ui/button";
import BagQuantityButton from "./quantity-btn";
import { useCartItems } from "@/app/(public)/components/cart-context";

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

      <div id="bag-table" className="mt-12 space-y-4">
        <Table>
          {/* <TableCaption>Table of your cart product</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dbCartItems.map((item) => {
              return (
                <TableRow key={item.variantId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell className="flex items-center justify-center">
                    <BagQuantityButton
                      productId={item.productId}
                      variantId={item.variantId}
                      currentQuantity={item.quantity}
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Button variant={"ghost"} className="hover:cursor-pointer ">
                      <Ellipsis />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quantity * item.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <BagActionSection total={total} />
      </div>
    </div>
  );
};

export default BagSections;
