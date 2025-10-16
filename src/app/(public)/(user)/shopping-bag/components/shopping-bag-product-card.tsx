"use client";

import { removeCartItem } from "@/actions/(public)/cart";
import { useCartStore } from "@/app/(public)/lib/cart-schema";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ProductCardForBagInterface {
  name: string;
  variant?: string;
  imgAddr?: string;
  variantId: string;
  productId: string;
}

const ProductCardForBag = ({
  name,
  variant,
  imgAddr,
  variantId,
  productId,
}: ProductCardForBagInterface) => {
  const { data: session } = useSession();
  const { removeItem } = useCartStore();

  const handleRemoveItem = () => {
    if (session && session?.user && session?.user?.id) {
      // if user is logged in then change the db cart item state
      removeCartItem(productId, variantId);
    } else {
      // otherwise change the state of the locally stored item data
      removeItem(productId, variantId);
    }
  };

  return (
    <div className="flex gap-8">
      <div id="image" className="rounded-md overflow-hidden">
        {imgAddr ? (
          <Image
            src={imgAddr}
            alt={`${name} image`}
            width={40}
            height={40}
            className="w-[120px] h-[120px]"
          />
        ) : (
          <div className="h-full w-full bg-gray-500"></div>
        )}
      </div>
      <div id="content" className="flex flex-col justify-between">
        <div id="info">
          <div className="text-3xl font-bold text-black">{name}</div>
          {variant && (
            <div>
              <span className="text-[14px] font-medium text-gray-500">
                {variant}
              </span>
            </div>
          )}
        </div>

        <button
          className="text-rose-500 w-fit font-medium hover:cursor-pointer text-sm"
          onClick={handleRemoveItem}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default ProductCardForBag;
