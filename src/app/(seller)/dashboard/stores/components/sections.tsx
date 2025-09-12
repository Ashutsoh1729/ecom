"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/util/states/modal";
import StoreTable from "./store-table";

const StoreSections = () => {
  const { openModal } = useModalStore();
  function handleCreatingStore() {
    openModal("storeCreating");
  }

  return (
    <div>
      <Button onClick={handleCreatingStore}>Create a New Store</Button>
      <StoreTable />
    </div>
  );
};

export default StoreSections;
