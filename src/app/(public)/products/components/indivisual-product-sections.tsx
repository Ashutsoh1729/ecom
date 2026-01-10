"use client";

import { Button } from "@/components/ui/button";
import { useAllProducts } from "../../components/context";
import Image from "next/image";
import ProductVariantSelection, { selectedVariants } from "./variant-selection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCartItem } from "@/actions/(public)/cart";

//  NOTE: Now all we just need to do is add the product to the user cart

const IndivisualProductPageSections = ({ slug }: { slug: string }) => {
  const allProducts = useAllProducts();
  const currentProductsList = allProducts?.filter((item) => item.slug === slug);
  const router = useRouter();
  // console.log(variantList);

  const [variants, setVariants] = useState<selectedVariants[] | []>([]);
  if (!currentProductsList) {
    return <div></div>;
  }
  const currentProduct = currentProductsList[0];

  const handleVarinats = (
    productId: string,
    variantId: string,
    price: number,
    variantName: string,
    productName: string,
    imageUrl: string,
  ) => {
    // first check whether it exists in the variants or not
    // If it exists we have to remove it
    // If it doesn't then we have to add it
    const currentObject = {
      productId: productId,
      price: price,
      variantName: variantName,
      variantId: variantId,
      productName: productName,
      imageUrl: imageUrl,
    };

    // product exists
    if (
      variants.some(
        (variant) =>
          variant.variantId == currentObject.variantId &&
          variant.productId == currentObject.productId &&
          variant.price == currentObject.price &&
          variant.variantName === currentObject.variantName &&
          variant.productName === currentObject.productName &&
          variant.imageUrl === currentObject.imageUrl,
      )
    ) {
      // console.log("This element exists");
      setVariants([
        ...variants.filter((item) => item.variantId != currentObject.variantId),
      ]);
    } else {
      setVariants([...variants, currentObject]);
    }
  };

  const handleAddToCart = (variants: selectedVariants[]) => {
    // Initially the quantity is 1, and you can increase in your shopping bag
    try {
      variants.forEach((item) => {
        addCartItem(item.productId, item.variantId, 1);
      });
      // router.push("/shopping-bag");
    } catch (err) {
      console.error(err);
    } finally {
      setVariants([]);
      router.refresh();
    }
  };

  return (
    <div className="px-16">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src={currentProduct.mainImageUrl}
              alt={currentProduct.name}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Info*/}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentProduct.name}
              </h1>

              <p className="text-gray-600">{currentProduct.description}</p>
            </div>

            {/* Variant Info*/}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Variants</h2>
              <div className="flex flex-col gap-2">
                <ProductVariantSelection
                  currentProduct={currentProduct}
                  handleSelect={handleVarinats}
                  variants={variants}
                />
              </div>
            </div>

            <Button
              className="w-full md:py-6 hover:cursor-pointer"
              onClick={() => handleAddToCart(variants)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualProductPageSections;
