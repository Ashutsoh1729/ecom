"use client";

// Will update this
import OrderCardItem from "./order-card";
import { Button } from "@/components/ui/button";
import { useCartItems } from "@/app/(public)/components/cart-context";
import { useState } from "react";
import { useAddresses } from "./address-context";
import { OrderAddressCard } from "./address-card";
import { AddressFormType } from "@/components/modals/address-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/util/states/modal";
import { Separator } from "@/components/ui/separator";
import { placeOrder } from "@/actions/(public)/order";

const OrderSections = () => {
  const dbCartItem = useCartItems();
  const { data: session } = useSession();
  const totalBillAmount = dbCartItem.reduce(
    (acc, item) => (acc += item.quantity * item.price),
    0,
  );
  const address = useAddresses();
  console.log(address);
  const router = useRouter();

  if (address === null) {
    router.push("/account");
  } else {
    const defaultAddress = address[0];
  }

  const { openModal } = useModalStore();
  const [selectedAddress, setSelectedAddress] = useState<
    (AddressFormType & { id: string }) | null
  >(address != null ? address[0] : null);
  // I need the shipping address id for placing the order

  // User can change his address
  // const handleChangeAddress = () => {};

  const handleAddAddress = () => {
    try {
      openModal("addressCreating");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    if (session && session.user.id) {
      // proceed to place an order if the user exists
      // then check for the addressId
      if (selectedAddress?.id) {
        try {
          const orderId = await placeOrder({
            shippingAddressId: selectedAddress.id,
          });
          const routingUrl = `/orders/${orderId}/success?amount=${totalBillAmount}`;
          router.push(routingUrl);
        } catch (err) {
          console.error(err);
          throw new Error("Creating an order failed");
        }
      }
    } else {
      // Handle if a user is not signed in by sending him to the sign-in page
      router.push("/auth/sign-in");
      toast("Create an Account First");
    }
  };

  return (
    <div
      id="order-container"
      className="w-full h-full px-16 pt-24 grid grid-cols-1 md:grid-cols-2 pb-24 gap-4"
    >
      <div id="shopping-details" className="col-span-1">
        <span className="text-xl">Shopping Details</span>
        <Separator className="mt-2 " />
        <div className="pr-4 flex flex-col gap-3 mt-2">
          <div>
            {selectedAddress != null ? (
              <OrderAddressCard address={selectedAddress} />
            ) : (
              <Button onClick={handleAddAddress}>Add an Address</Button>
            )}
          </div>
          {/* <Button
            variant={"outline"}
            onClick={handleChangeAddress}
            className="border-black"
          >
            Change Address
          </Button> */}
        </div>
      </div>
      <div id="order-items" className="w-full col-span-1">
        <span className="text-xl">Order Items</span>
        <div>
          {dbCartItem.map((item) => {
            return (
              <OrderCardItem
                key={item.variantId}
                imageUrl={item.imageUrl}
                productName={item.productName}
                variantName={item.variantName}
                variantId={item.variantId}
                productId={item.productId}
                quantity={item.quantity}
                price={item.price}
              />
            );
          })}
        </div>

        <div className="w-full flex justify-between items-center mt-3 pt-6 border-slate-400 border-dashed mb-4 border-t-2">
          <span className="text-lg ">Total Bill:</span>
          <span className="text-xl font-semibold">{totalBillAmount}</span>
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="w-full mt-4 hover:cursor-pointer"
        >
          Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSections;
