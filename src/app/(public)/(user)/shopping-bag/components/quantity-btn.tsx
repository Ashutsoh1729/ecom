"use client";

import { useCartStore } from "@/app/(public)/lib/cart-schema";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface BagQuantityButtonInterface {
  productId: string;
  variantId: string;
}

const BagQuantityButton = ({
  productId,
  variantId,
}: BagQuantityButtonInterface) => {
  //  TODO: Here we have to update the item quantity in the cart store

  const { items, updateQuantity } = useCartStore();
  const currentItem = items.filter(
    (item) => item.productId === productId && item.variantId == variantId,
  )[0];

  function handleMinus() {
    if (currentItem.quantity > 1) {
      const newQuantity = currentItem.quantity - 1;
      updateQuantity(productId, newQuantity, variantId);
    }
    return;
  }

  function handlePlus() {
    const newQuantity = currentItem.quantity + 1;
    updateQuantity(productId, newQuantity, variantId);
  }

  return (
    <div className="">
      <Button
        onClick={handleMinus}
        className=""
        variant={"outline"}
        disabled={currentItem.quantity == 1}
      >
        <Minus />
      </Button>
      <span className="px-4 text-[18px]">{currentItem.quantity}</span>
      <Button onClick={handlePlus} className="" variant={"outline"}>
        <Plus />
      </Button>
    </div>
  );
};

export default BagQuantityButton;
