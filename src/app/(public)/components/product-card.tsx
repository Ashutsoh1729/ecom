"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { ChevronRight, ShoppingCart, Star, StarIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LikeButton } from "./like-btn";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export interface ProductCardInterface {
  img: string;
  alt: string;
  productName: string;
  productId: string;
  slug: string;
  price: number;
  rating?: number;
  category?: string;
}

export const ProductCard: React.FC<ProductCardInterface> = ({
  img,
  productName,
  alt,
  price,
  rating,
  category,
}: ProductCardInterface) => {
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
                View Product <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductCard_2 = ({
  img,
  slug,
  productName,
  productId,
  alt,
  price,
}: ProductCardInterface) => {
  const router = useRouter();
  return (
    <div>
      <Card className="gap-0 p-4 hover:cursor-pointer">
        <CardContent className="p-0 relative">
          <div className="absolute z-30 right-0 top-0 mr-2 mt-2">
            <LikeButton productId={productId} productName={productName} />
          </div>
          <Image
            src={img}
            alt={alt}
            className="rounded-[8px] bg-zinc-300 w-full"
            width={500}
            height={600}
            unoptimized
          />
          <div
            id="client-product-card"
            className="flex w-full mt-2 items-end justify-between"
          >
            <p className="text-[18px] text-gray-600">{productName}</p>
            <p className="text-lg font-bold text-gray-800">₹{price}</p>
          </div>
        </CardContent>
        <CardFooter className="mt-2 p-0">
          <CardAction className="w-full">
            <Button
              className="w-full flex items-center hover:cursor-pointer"
              variant={"outline"}
              onClick={() => {
                router.push(`/products/${slug}`);
              }}
            >
              View in details
              <ChevronRight />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export interface ProductCardInterfaceV3 {
  img: string;
  alt: string;
  productName: string;
  productId: string;
  slug: string;
  price: number;
  rating?: number;
  category?: string;
  originalPrice?: number;
  stock?: number;
  reviewCount?: number;
  isNew?: boolean;
  brand?: string;
}

export const ProductCardV3 = ({
  img,
  alt,
  productName,
  productId,
  slug,
  price,
  rating = 0,
  category,
  originalPrice,
  stock,
  reviewCount = 0,
  isNew = false,
  brand,
}: ProductCardInterfaceV3) => {
  const router = useRouter();

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // const isLowStock = stock !== undefined && stock > 0 && stock <= 5;
  const isOutOfStock = stock === 0;

  const handleCardClick = () => {
    router.push(`/products/${slug}`);
  };

  return (
    <Card
      className="group p-0 flex flex-col gap-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 relative">
        {/* Badges Container */}
        <div className="absolute z-20 top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>
          )}
          {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
          {isOutOfStock && (
            <Badge variant="secondary" className="bg-gray-700 text-white">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <div className="absolute z-30 right-3 top-3">
          <LikeButton productId={productId} productName={productName} />
        </div>

        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={img}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex items-center justify-between">
          {/* Product Name */}
          <h3 className="font-normal text-[22px] text-gray-900 line-clamp-2">
            {productName}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              ₹{price.toLocaleString()}
            </span>
            {/* {originalPrice && originalPrice > price && (
              <span className="text-base text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )} */}
          </div>

          {/* Rating & Stock Row */}
          {/* <div className="flex items-center justify-between">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <span className="text-sm text-gray-500">({reviewCount})</span>
                )}
              </div>
            )}

            {isLowStock && (
              <p className="text-xs text-orange-600 font-medium">
                Only {stock} left
              </p>
            )}
          </div> */}

          {/* Category & Brand - moved to bottom */}
          {(category || brand) && (
            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
              {category && <span>{category}</span>}
              {category && brand && <span>•</span>}
              {brand && <span>{brand}</span>}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col w-full gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-full h-20 w-full"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${slug}`);
          }}
          disabled={isOutOfStock}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        <Button
          className="flex-1 rounded-full h-20 bg-black hover:bg-gray-800 w-full"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
          disabled={isOutOfStock}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
