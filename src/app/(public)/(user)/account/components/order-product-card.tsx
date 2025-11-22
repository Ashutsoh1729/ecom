"use client";

import Image from "next/image";

interface OrderAccountProductCardInterface {
  recipientName: string;
  productName: string;
  productImage: string;
  productPrice: number | null;
  productSlug: string;
  productSku: string | null;
  deliveryDate: Date;
  deliveryState: string;
  deliveryStatus: string;
}

const OrderAccountProductCard = ({
  productName,
  deliveryDate,
  deliveryStatus,
  productImage,
  productPrice,
  recipientName,
  deliveryState,
}: OrderAccountProductCardInterface) => {
  const date = new Date(deliveryDate);
  const formatedDate = date.toDateString().slice(4);

  return (
    <div
      id="account-produc-card"
      className="p-4 text-[12px] border-2 border-gray-300 rounded-md "
    >
      <div id="card-container" className="flex gap-5 items-stretch">
        <div
          id="product-imgae"
          className="rounded-md overflow-hidden lg:max-h-[180px]  lg:min-w-[180px]"
        >
          {productImage ? (
            <Image
              className="w-full h-full object-cover object-center "
              width={160} // Set a sufficient width/height for Next.js Image optimization
              height={160}
              src={productImage}
              alt={`${productName}`}
            />
          ) : (
            <span className="bg-slate-400"></span>
          )}
        </div>
        <div
          id="product-content"
          className="flex flex-col justify-between w-full"
        >
          <div id="top-info" className="font-medium text-gray-600">
            <div id="delivery-status">
              <span>Status:</span>
              <span> {deliveryStatus}</span>
            </div>
            <div id="delivery-time">
              <span>
                {deliveryStatus.toLowerCase() == "delivered"
                  ? "Arrived: "
                  : "Arriving: "}
              </span>
              <span>{`${formatedDate}`}</span>
            </div>
          </div>
          <div id="bottom-info" className="w-full">
            <div className="flex flex-col">
              <span className="text-balance text-[24px] font-bold text-black">
                {productName}
              </span>
              <span className="font-medium text-gray-600">
                Delivering to:
                <span>
                  {recipientName}, {deliveryState}
                </span>
              </span>
            </div>
            <div className="flex w-full items-end justify-between">
              <div className="font-medium">
                <span className="text-blue-700 hover:text-blue-400 hover:cursor-pointer">
                  Track Package
                </span>{" "}
                |{" "}
                <span className="text-blue-700 hover:text-blue-400 hover:cursor-pointer">
                  View Details
                </span>
              </div>
              <span className="text-xl font-bold">₹ {productPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAccountProductCard;
