"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/util/states/modal";
import { useStoreList } from "../../(root)/context/store-context";

const ProductSections = () => {
  const storeLists = useStoreList();
  const { openModal } = useModalStore();
  return (
    <div>
      <Button
        onClick={() => {
          if (storeLists === null) {
          }

          openModal("productCreating");
        }}
      >
        Create Product
      </Button>
    </div>
  );
};

export default ProductSections;
