"use client";

import { useCartItems } from "@/app/(public)/components/cart-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductCardForBag from "./shopping-bag-product-card";
import { Button } from "@/components/ui/button";
import BagQuantityButton from "./quantity-btn";
import { Ellipsis } from "lucide-react";

const ShoppingBagTable = () => {
  const dbCartItems = useCartItems();
  return (
    <div>
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
              <TableRow key={item.variantId} className="h-fit">
                <TableCell>
                  <ProductCardForBag
                    name={item.productName}
                    variantId={item.variantId}
                    productId={item.productId}
                    imgAddr={item.imageUrl}
                    variantName={item.variantName}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <BagQuantityButton
                      productId={item.productId}
                      variantId={item.variantId}
                      currentQuantity={item.quantity}
                    />
                  </div>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Button variant={"ghost"} className="hover:cursor-pointer ">
                      <Ellipsis />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.quantity * item.price}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShoppingBagTable;
