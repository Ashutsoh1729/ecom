"use client";

import { Button } from "@/components/ui/button";
import { StoreTableDataInterface } from "@/lib/logic";
import { useModalStore } from "@/util/states/modal";
import StoreTable from "./store-table";

const StoreSections = ({
  storesList,
}: {
  storesList: StoreTableDataInterface[];
}) => {
  const { openModal } = useModalStore();
  function handleCreatingStore() {
    openModal("storeCreating");
  }

  return (
    <div>
      <Button onClick={handleCreatingStore}>Create a New Store</Button>
      <StoreTable storeDataList={storesList} />
    </div>
  );
};

export default StoreSections;
