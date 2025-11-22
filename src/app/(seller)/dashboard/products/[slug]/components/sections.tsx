"use client";

import { useParams } from "next/navigation";
import {
  allDataListType,
  useAllStoresDataList,
} from "../../../(root)/context/store-context";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function findProductBySlug(allStoreData: allDataListType | null, slug: string) {
  if (!allStoreData) return null;

  // Loop through each store
  for (const store of allStoreData) {
    // Check if the store is active and has products
    if (store.isActive && store.products.length > 0) {
      // Try to find the product in this store's product list
      const foundProduct = store.products.find((p) => p.slug === slug);
      // If we found it, return it immediately and stop searching
      if (foundProduct) {
        return foundProduct;
      }
    }
  }

  // If the loop finishes and we haven't found the product, return null
  return null;
}

const ProductIndivisualPageSections = () => {
  const params = useParams<{ slug: string }>();
  const allStoreData = useAllStoresDataList();
  const product = findProductBySlug(allStoreData, params.slug);
  // const productMainImage = getProductMainImage({ img });

  // NOTE: Currently i have made the image objects in my bucket public

  /*  if (!allStoreData) {
    return <div>Loading store data...</div>;
  }

  // Now this check works correctly!
  if (!product) {
    return <div>Product not found.</div>;
  }

  // console.log(product.mainImageUrl);

  return (
    <div>
      it should start working. i guess.
      <div>Here you are inside this product page: {params.slug}</div>
      <div>Show product image here below:</div>
      <div className="overflow-hidden w-[300px] h-64">
        <Image
          alt={product.name}
          src={product.mainImageUrl}
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  ); */

  if (!allStoreData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading store data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
          <Badge
            variant={
              product.status === "active"
                ? "default"
                : product.status === "draft"
                  ? "secondary"
                  : "destructive"
            }
            className="mt-2"
          >
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative w-full aspect-square md:max-w-lg  rounded-md overflow-hidden">
              <Image
                alt={product.name}
                src={product.mainImageUrl}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "top center" }}
                className="rounded-lg bg-background"
                priority
              />
            </div>
            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">Product Details</h3>
                {/* <p className="text-sm text-gray-500">ID: {product.id}</p> */}
                <div className="pt-4">
                  <p className="text-[18px] font-medium">Description:</p>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
                {/* <p className="text-sm text-gray-500">Slug: {product.slug}</p> */}
              </div>
              {/* Variants Table */}
              {product.variants.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Variants</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.variants.map((variant, index) => (
                        <TableRow key={index}>
                          <TableCell>${variant.price.toFixed(2)}</TableCell>
                          <TableCell>{variant.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No variants available.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductIndivisualPageSections;
