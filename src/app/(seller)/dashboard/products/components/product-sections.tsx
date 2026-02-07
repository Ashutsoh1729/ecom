"use client";

import { useModalStore } from "@/util/states/modal";
import {
  allDataListType,
  useAllStoresDataList,
  useStoreList,
} from "../../(root)/context/store-context";
import { ModernProductTable } from "./product-table";
import { getModernProductColumns, ProductTableColumn } from "./product-columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/(seller)/product/product-actions";
import { PlusIcon, Package, PackageCheck, PackageX, FileEdit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function processedProductList(allStoreData: allDataListType): ProductTableColumn[] {
  const productList = allStoreData.flatMap((store) => {
    if (store.products.length > 0 && store.isActive) {
      return store.products.map((product) => {
        const priceList = product.variants.map((variant) => variant.price);
        const minPrice = Math.min(...priceList);
        const maxPrice = Math.max(...priceList);

        const quantityList = product.variants.map((variant) => variant.quantity);
        const totalQuantity = quantityList.reduce((sum, q) => sum + q, 0);

        return {
          id: product.id,
          name: product.name,
          status: product.status,
          storeName: store.storeName,
          slug: product.slug,
          mainImg: product.mainImageUrl,
          price:
            product.variants.length > 0
              ? minPrice !== maxPrice
                ? `₹${minPrice.toLocaleString("en-IN")} - ₹${maxPrice.toLocaleString("en-IN")}`
                : `₹${minPrice.toLocaleString("en-IN")}`
              : "No variants",
          quantity: totalQuantity,
          variantCount: product.variants.length,
        };
      });
    }
    return [];
  });
  return productList;
}

const ProductSections = () => {
  const router = useRouter();
  const storeLists = useStoreList();
  const { openModal } = useModalStore();

  const allStoreData = useAllStoresDataList();

  if (allStoreData === null) {
    return (
      <div className="w-full h-full px-16 pt-8">
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="animate-pulse text-muted-foreground">
              Loading products...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      await deleteProduct({ id: productId });
      toast.success(`Product "${productName}" has been deleted.`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  const productList = processedProductList(allStoreData);
  const activeProducts = productList.filter((p) => p.status === "active");
  const draftProducts = productList.filter((p) => p.status === "draft");
  const archivedProducts = productList.filter((p) => p.status === "archived");
  const totalStock = productList.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="w-full h-full px-16 pt-8 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Your Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button
          onClick={() => {
            if (storeLists === null) return;
            openModal("productCreating");
          }}
          className="gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Create Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productList.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
            <PackageCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeProducts.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft
            </CardTitle>
            <FileEdit className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {draftProducts.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Stock
            </CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalStock.toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            Click on a product row to view and edit details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {productList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first product to start selling
              </p>
              <Button
                onClick={() => openModal("productCreating")}
                variant="outline"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>
          ) : (
            <ModernProductTable
              columns={getModernProductColumns(handleDeleteProduct)}
              data={productList}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSections;
