"use client";

import { useModalStore } from "@/util/states/modal";
import {
  allDataListType,
  useAllStoresDataList,
  useStoreList,
} from "../../(root)/context/store-context";
import { ProductPageTable_2 } from "./product-table";
import { getProductColumns, productTableColumn } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/(seller)/product/product-actions";
import SectionHeader from "@/components/page-sections/section-header";
import { PlusIcon } from "lucide-react";

function processedProductList(allStoreData: allDataListType) {
  const productList = allStoreData.flatMap((store) => {
    let newProductData: productTableColumn[] | [];
    if (store.products.length > 0 && store.isActive) {
      newProductData = store.products.map((product) => {
        const priceList = product.variants.map((variant) => variant.price);
        const minPrice = Math.min(...priceList);
        const maxPrice = Math.max(...priceList);

        const quantityList = product.variants.map(
          (variant) => variant.quantity,
        );

        const minQuantity = Math.min(...quantityList);
        const maxQuantity = Math.max(...quantityList);

        return {
          id: product.id,
          name: product.name,
          status: product.status,
          storeName: store.storeName,
          slug: product.slug,
          mainImg: product.mainImageUrl,
          price:
            product.variants.length > 0
              ? minPrice != maxPrice
                ? `${minPrice}-${maxPrice}`
                : `${minPrice}`
              : `0`,
          quantity:
            product.variants.length > 0
              ? minQuantity != maxQuantity
                ? `${minQuantity}-${maxQuantity}`
                : `${minQuantity}`
              : `0`,
        };
      });
    } else {
      newProductData = [];
    }

    return newProductData;
  });
  return productList;
}

const ProductSections = () => {
  const router = useRouter(); // <-- Use the hook in the component
  const storeLists = useStoreList();
  const { openModal } = useModalStore();

  const allStoreData = useAllStoresDataList();
  if (allStoreData === null) {
    return;
  }

  // 1. Define the handler function here
  const handleDeleteProduct = async (
    productId: string,
    productName: string,
  ) => {
    // You can add a confirmation dialog here if you want
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      await deleteProduct({ id: productId });
      toast.success(`Product "${productName}" has been deleted.`);
      router.refresh(); // <-- This is the key! Re-fetches data and re-renders the page.
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  const productList = processedProductList(allStoreData);
  /* 
  const productList = allStoreData.flatMap((store) => {
	return store.products;
  });
 */
  return (
    <div className="w-full h-full px-16 pt-12">
      <SectionHeader
        name="Your Products"
        hasCTA
        ctaName="Create Product"
        buttonVariant="default"
        hasIcon
        iconType="leading"
        IconComponent={PlusIcon}
        buttonAction={() => {
          if (storeLists === null) {
          }

          openModal("productCreating");
        }}
      />

      <div className="pt-12 pb-12" id="product-table">
        {/* <ProductPageTable /> */}

        <ProductPageTable_2
          columns={getProductColumns(handleDeleteProduct)}
          data={productList}
        />
      </div>
    </div>
  );
};

export default ProductSections;
