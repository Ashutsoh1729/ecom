"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/util/states/modal";
import StoreTable, { StoreTable_2 } from "./store-table";
import { deleteStore } from "@/actions/store-actions";
import { toast } from "sonner";
import { StoreColumns } from "../../products/components/columns";
import { useAllStoresDataList } from "../../(root)/context/store-context";
import { useRouter } from "next/navigation";

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
  const columns = StoreColumns(handleDeleteingStore);

  return (
    <div>
      <Button onClick={handleCreatingStore}>Create a New Store</Button>
      <StoreTable />
      <div className="mt-24">
        <StoreTable_2 columns={columns} data={storeData} />
      </div>
    </div>
  );
};

export default StoreSections;
