"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BagActionSection = ({ total }: { total: number }) => {
  const router = useRouter();

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
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 pb-24">
      <div className="md:col-span-2">Have a coupon?</div>
      <div className="space-y-4 border border-slate-300 p-2 rounded-md md:col-span-1">
        <div className="text-gray-700 ">Cart Summery</div>
        <div>{/* Here i will add the selection options*/}</div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-medium">{total}</span>
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
