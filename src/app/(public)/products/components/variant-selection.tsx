"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getAllProductInterface } from "@/lib/data/products";

export interface selectedVariants {
  variantId: string;
  productId: string;
  variantName: string;
  price: number;
  productName: string;
  imageUrl: string;
}

interface ProductVariantSelectionInterface {
  currentProduct: getAllProductInterface;
  variants: selectedVariants[] | [];
  handleSelect: (
    productId: string,
    variantId: string,
    price: number,
    variantName: string,
    productName: string,
    imageUrl: string,
  ) => void;
}

const ProductVariantSelection = ({
  currentProduct,
  handleSelect,
  variants,
}: ProductVariantSelectionInterface) => {
  console.log(variants);

  return (
    <div className="flex flex-col gap-2">
      {currentProduct.variants.map((variant, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg"
          onClick={() =>
            handleSelect(
              currentProduct.id,
              variant.id,
              variant.price,
              variant.name,
              currentProduct.name,
              currentProduct.mainImageUrl,
            )
          }
        >
          <div className="flex gap-4">
            <Switch
              id="variant-switch"
              checked={variants.some(
                (item) =>
                  item.variantId === variant.id &&
                  item.variantName === variant.name &&
                  item.price === variant.price &&
                  item.productId === currentProduct.id,
              )}
            />
            {/* <span className="text-gray-900">{variant.name}</span> */}
            <Label className="text-gray-900">{variant.name}</Label>
          </div>
          <span className="text-lg font-medium">
            ₹{variant.price.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductVariantSelection;
