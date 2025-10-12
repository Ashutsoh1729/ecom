"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/util/states/modal";
import StoreTable, { StoreTable_2 } from "./store-table";
import {
  deleteStore,
  updateActiveStatus,
} from "@/actions/(seller)/store-actions";
import { toast } from "sonner";
import { StoreColumns } from "../../products/components/columns";
import { useAllStoresDataList } from "../../(root)/context/store-context";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/page-sections/section-header";
import { PlusIcon } from "lucide-react";

const StoreSections = () => {
  const { openModal } = useModalStore();

  const router = useRouter();
  const allStoreData = useAllStoresDataList();
  if (allStoreData === null) {
    return;
  }
  const storeData = allStoreData.map((store) => {
    return { id: store.id, name: store.storeName, isActive: store.isActive };
  });

  console.log(storeData);

  function handleCreatingStore() {
    openModal("storeCreating");
  }
  async function handleDeleteingStore(storeId: string, storeName: string) {
    await deleteStore(storeId);
    toast(`Store named ${storeName} is deleted.`);
    router.refresh();
  }

  async function handleToggleStoreActiveStatus(
    storeId: string,
    storeName: string,
  ) {
    await updateActiveStatus(storeId);
    toast(`Store named ${storeName} is changed.`);
    router.refresh();
  }

  const columns = StoreColumns({
    onDelete: handleDeleteingStore,
    changeActive: handleToggleStoreActiveStatus,
  });

  return (
    <div className="w-full h-full px-16 pt-12">
      <SectionHeader
        name="Your Stores"
        hasCTA
        ctaName="Create Store"
        buttonVariant="default"
        hasIcon
        iconType="leading"
        IconComponent={PlusIcon}
        buttonAction={() => {
          openModal("productCreating");
        }}
      />
      {/* <StoreTable /> */}
      <div className="mt-12">
        <StoreTable_2 columns={columns} data={storeData} />
      </div>
    </div>
  );
};

export default StoreSections;
