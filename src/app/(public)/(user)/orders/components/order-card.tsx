"use client";

import Image from "next/image";

interface OrderCardItemProps {
  imageUrl: string;
  productName: string;
  variantName: string;
  variantId: string;
  productId: string;
  quantity: number;
  price: number;
}

const OrderCardItem = ({
  imageUrl,
  price,
  productId,
  productName,
  variantId,
  variantName,
  quantity,
}: OrderCardItemProps) => {
  return (
    <div className="py-2 flex gap-4 h-fit ">
      <div className="relative flex items-center rounded-md overflow-hidden w-[120px] h-[120px] ">
        <Image src={imageUrl} alt={productName + " " + variantName} fill />
      </div>
      <div id="card-container" className="w-full  flex justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-medium">{productName}</span>
          <span>{variantName}</span>
          <div className="flex">
            Quantity:
            <span className="bg-black text-[12px] flex items-center justify-center font-medium rounded-full w-fit md:px-[8px] ml-1 md:py-[3px] text-white ">
              {quantity}
            </span>
          </div>
        </div>
        <div className="h-full flex flex-col items-end ">
          <div className="mt-auto text-gray-700-500 ">
            Total:
            <span className="font-medium text-lg ml-[4px]">
              {price * quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardItem;
