"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/util/states/modal";
import { ModernStoreTable } from "./store-table";
import {
  deleteStore,
  updateActiveStatus,
} from "@/actions/(seller)/store-actions";
import { toast } from "sonner";
import { getModernStoreColumns } from "./store-columns";
import { useAllStoresDataList } from "../../(root)/context/store-context";
import { useRouter } from "next/navigation";
import { PlusIcon, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StoreSections = () => {
  const { openModal } = useModalStore();

  const router = useRouter();
  const allStoreData = useAllStoresDataList();

  if (allStoreData === null) {
    return (
      <div className="w-full h-full px-16 pt-8">
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="animate-pulse text-muted-foreground">
              Loading stores...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const storeData = allStoreData.map((store) => ({
    id: store.id,
    name: store.storeName,
    isActive: store.isActive,
  }));

  async function handleDeletingStore(storeId: string, storeName: string) {
    await deleteStore(storeId);
    toast.success(`Store "${storeName}" has been deleted.`);
    router.refresh();
  }

  async function handleToggleStoreActiveStatus(
    storeId: string,
    storeName: string
  ) {
    await updateActiveStatus(storeId);
    toast.success(`Store "${storeName}" status updated.`);
    router.refresh();
  }

  const columns = getModernStoreColumns({
    onDelete: handleDeletingStore,
    changeActive: handleToggleStoreActiveStatus,
  });

  return (
    <div className="w-full h-full px-16 pt-8 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Your Stores</h1>
          <p className="text-muted-foreground">
            Manage your storefronts and their visibility
          </p>
        </div>
        <Button
          onClick={() => openModal("storeCreating")}
          className="gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Create Store
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Stores
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Stores
            </CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {storeData.filter((s) => s.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive Stores
            </CardTitle>
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {storeData.filter((s) => !s.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Stores</CardTitle>
          <CardDescription>
            A list of all your stores. Toggle visibility or manage settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {storeData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Store className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No stores yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first store to start selling
              </p>
              <Button onClick={() => openModal("storeCreating")} variant="outline">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Store
              </Button>
            </div>
          ) : (
            <ModernStoreTable columns={columns} data={storeData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreSections;
