"use client";
import SectionHeader from "@/components/page-sections/section-header";
import {
  Table,
  TableBody,
  TableCaption,
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

const BagSections = () => {
  const router = useRouter();
  const [q1, setQ1] = useState(1);

  const handleFirstHeaderAction = () => {
    router.push("/");
  };

  return (
    <div>
      <SectionHeader
        name="My Bag"
        hasCTA={true}
        ctaName="continue shopping"
        hasIcon={true}
        iconComponent={<ChevronsLeft />}
        iconType="leading"
        buttonAction={handleFirstHeaderAction}
      />

      <div id="bag-table">
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
            <TableRow>
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
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BagSections;
