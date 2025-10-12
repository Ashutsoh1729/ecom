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
import { ChevronsLeft } from "lucide-react";
import ProductCardForBag from "./shopping-bag-product-card";
import { useRouter } from "next/navigation";
import BagQuantityButton from "./quantity-btn";
import { useState } from "react";
import { useCartStore } from "@/app/(public)/lib/cart-schema";
import BagActionSection from "./bag-action";

const BagSections = () => {
  const router = useRouter();
  const { items } = useCartStore();

  const handleFirstHeaderAction = () => {
    router.push("/");
  };

  // The global hook is working perfectly as expected
  /* useEffect(() => {
    console.log(items);
  }, [items]); */

  if (items.length === 0) {
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
        <div className="flex items-center justify-center pt-24">
          Your shopping bag is empty, please add some items to it.
        </div>
      </div>
    );
  }

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

      <div id="bag-table" className="mt-12">
        <Table>
          {/* <TableCaption>Table of your cart product</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <ProductCardForBag
                      name={item.productName}
                      variant={item.variantName}
                      imgAddr={item.imageUrl}
                      variantId={item.variantId}
                      productId={item.productId}
                    />
                  </TableCell>

                  <TableCell>
                    <BagQuantityButton
                      variantId={item.variantId}
                      productId={item.productId}
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity * item.price}</TableCell>
                </TableRow>
              );
            })}

            {/* <TableRow>
              <TableCell>
                <ProductCardForBag
                  name="Aomnis"
                  variant="Size: L, Color: blue"
                  imgAddr="/image/haryo-setyadi-acn5ERAeSb4-unsplash.jpg"
                />
              </TableCell>
              <TableCell>
                <BagQuantityButton value={q1} onChange={setQ1} />
              </TableCell>
              <TableCell>₹ 1200</TableCell>
              <TableCell>{q1 * 1200}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
        <BagActionSection />
      </div>
    </div>
  );
};

export default BagSections;
