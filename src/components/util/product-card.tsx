"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

export interface ProductCardInterface {
  img: string;
  alt: string;
  productName: string;
  price: number;
  rating: number;
  category: string;
}

const ProductCard: React.FC<ProductCardInterface> = ({
  img,
  productName,
  alt,
  price,
  rating,
  category,
}) => {
  function handleAddToCart() {
    console.log("Item added to cart. Item name: ${productName}");
  }

  return (
    <>
      <div className="p-4 rounded-2xl flex grow border-[2px] border-slate-300">
        <div id="product-card-container" className="flex flex-col w-full">
          <div id="product-card-img">
            <Image
              src={img}
              alt={alt}
              className="rounded-[8px] bg-zinc-300 w-full"
              width={500}
              height={1000}
              unoptimized
            />
          </div>
          <div
            id="product-card-bottom"
            className="flex flex-col justify-between grow w-full"
          >
            <div id="product-info" className="pt-2">
              <div
                id="product-info-container"
                className="grid grid-cols-6 px-[4px] gap-0.5 my-2 "
              >
                <div className="col-span-4 flex flex-col gap-3">
                  <span className="text-[11px] w-fit  px-[10px] py-[4px]  bg-gray-700 text-white rounded-xl">
                    {category}
                  </span>
                  <div className="text-black text-[14px] text-pretty font-medium ">
                    {productName}
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-end col-span-2">
                  <div className=" flex gap-1 justify-end items-start pt-[4px] font-medium text-[12px]">
                    <StarIcon width={16} height={16} fill="#F0A607" stroke="" />
                    {rating}
                  </div>
                  <div className="text-[16px] font-bold"> $ {price}</div>
                </div>
              </div>
            </div>
            <div id="product-cta" className="w-full">
              <Button
                className="w-full flex items-center justify-center"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
