"use client";

import { useCartStore } from "@/app/(public)/lib/cart-schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BagActionSection = () => {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const totalPriceArray = items.map((item) => item.quantity * item.price);
  const totalPrice = totalPriceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0); // 0 to set the starting point as first item

  const handleCheckout = () => {
    try {
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/orders");
      console.log("Handle Checkout is Clicked");
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
      <div>Have a coupon?</div>
      <div>
        <div>Cart Summery</div>
        <div>{/* Here i will add the selection options*/}</div>
        <div className="flex justify-between items-center pr-24">
          <span className="text-xl">Total</span>
          <span className="text-xl">{totalPrice}</span>
        </div>
        <Button
          className="w-full mt-4 hover:cursor-pointer"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default BagActionSection;
