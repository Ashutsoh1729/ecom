"use client";

import { useCartStore } from "@/app/(public)/lib/cart-schema";
import OrderCardItem from "./order-card";
import { Button } from "@/components/ui/button";

const OrderSections = () => {
  const { items } = useCartStore();

  return (
    <div
      id="order-container"
      className="w-full h-full px-16 pt-24 grid grid-cols-1 md:grid-cols-2"
    >
      <div id="shopping-details" className="col-span-1">
        <span className="text-xl">Shopping Details</span>
      </div>
      <div id="order-items" className="w-full col-span-1">
        <span className="text-xl">Order Items</span>
        <div>
          {items.map((item) => (
            <OrderCardItem
              key={item.variantId}
              quantity={item.quantity}
              productName={item.productName}
              productId={item.productId}
              variantName={item.variantName}
              price={item.quantity * item.price}
              variantId={item.variantId}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>

        <Button className="w-full mt-4">Order</Button>
      </div>
    </div>
  );
};

export default OrderSections;
