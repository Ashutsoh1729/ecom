"use client";

import Image from "next/image";

interface OrderAccountProductCardInterface {
  productName: string;
  deliveryCity: string;
  deliveryStatus: string;
  deliveryTime: string;
  productPrice: number;
  productImage: string;
  recipientName: string;
}

const OrderAccountProductCard = ({
  productName,
  deliveryTime,
  deliveryStatus,
  productImage,
  productPrice,
  recipientName,
  deliveryCity,
}: OrderAccountProductCardInterface) => {
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
        <div id="product-content" className="flex flex-col justify-between">
          <div id="top-info" className="font-medium text-gray-600">
            <div id="delivery-status">
              <span>Status:</span>
              <span>{deliveryStatus}</span>
            </div>
            <div id="delivery-time">
              <span>
                {deliveryStatus.toLowerCase() == "delivered"
                  ? "Arrived: "
                  : "Arriving: "}
              </span>
              <span>{deliveryTime}</span>
            </div>
          </div>
          <div id="bottom-info">
            <div className="flex flex-col">
              <span className="text-balance text-[16px] font-bold text-black">
                {productName}
              </span>
              <span className="font-medium text-gray-600">
                Delivering to:
                <span>
                  {recipientName}, {deliveryCity}
                </span>
              </span>
            </div>
            <div className="flex items-end justify-between">
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
