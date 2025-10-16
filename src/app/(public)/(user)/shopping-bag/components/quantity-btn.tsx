"use client";

import { updateCartItem } from "@/actions/(public)/cart";
import { CartItemType } from "@/app/(public)/lib/cart-schema";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BagQuantityButtonInterface {
  productId: string;
  variantId: string;
  currentQuantity: number;
}

const BagQuantityButton = ({
  productId,
  variantId,
  currentQuantity,
}: BagQuantityButtonInterface) => {
  //  TODO:  separate state change for db items and locally stored items

  const { data: session } = useSession();
  const route = useRouter();

  function handleMinus() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      if (session && session.user.id) {
        updateCartItem(productId, variantId, newQuantity);
        route.refresh();
      }
    }
    return;
  }

  function handlePlus() {
    const newQuantity = currentQuantity + 1;
    if (session && session.user.id) {
      updateCartItem(productId, variantId, newQuantity);
      route.refresh();
    }
  }

  return (
    <div className="">
      <Button
        onClick={handleMinus}
        className=""
        variant={"outline"}
        disabled={currentQuantity == 1}
      >
        <Minus />
      </Button>
      <span className="px-4 text-[14px]">{currentQuantity}</span>
      <Button onClick={handlePlus} className="" variant={"outline"}>
        <Plus />
      </Button>
    </div>
  );
};

export default BagQuantityButton;
