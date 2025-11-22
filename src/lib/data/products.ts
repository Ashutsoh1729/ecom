import { db } from "@/db/client";
import { products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redis_client } from "@/util/upstash";

export interface getSellerStoreAllDataOutputInterface {
  id: string;
  storeName: string;
  slug: string;
  isActive: boolean;
  products: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    mainImageUrl: string;
    status: "draft" | "active" | "archived";
    variants: {
      price: number;
      quantity: number;
    }[];
  }[];
}

export const getSellerStoreAllData = async () => {
  const session = await auth();

  const sellerId = session?.user.sellerId;
  if (!sellerId) {
    throw new Error("The user is not a seller. He shouldn't be here.");
  }

  // TODO:Now we will take this seller id, and extract all the stores, their products and their variants, i will implement it later, for it, i have to create a relationship between the seller and the store, and then the store and the products

  const storesWithDetails = await db.query.stores.findMany({
    // 1. Filter the stores to only those belonging to the specified seller
    where: eq(stores.sellerId, sellerId),
    columns: {
      storeName: true,
      slug: true,
      isActive: true,
      id: true,
    },

    // 2. Use the 'with' clause to include related data
    with: {
      // 3. Include the 'products' for each store (using the relation from storeRelations)
      products: {
        columns: {
          id: true,
          mainImageUrl: true,
          description: true,
          name: true,
          status: true,
          slug: true,
        },

        // 4. For each product, also include its 'variants' (using the relation from productsRelations)
        with: {
          variants: {
            columns: {
              price: true,
              quantity: true,
            },
          },
        },
      },
    },
  });

  return storesWithDetails;
};

export interface getAllProductInterface {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  mainImageUrl: string;
  status: "draft" | "active" | "archived";
  variants: {
    price: number;
    name: string;
    id: string;
  }[];
}

// only extract the active products
export const getAllProduct = async (): Promise<getAllProductInterface[]> => {
  // we will cache the query with upstash

  // first try to get the data from redis
  let allProducts =
    await redis_client.get<getAllProductInterface[]>("allProduct");

  // if it don't find it then it will do db call and then cache it
  if (allProducts === null) {
    const allProductData = await db.query.products.findMany({
      where: eq(products.status, "active"),
      columns: {
        storeId: false,
        createdAt: false,
        updatedAt: false,
      },
      with: {
        variants: {
          columns: {
            price: true,
            name: true,
            id: true,
          },
        },
      },
    });
    // redis sdk will stringify for us
    redis_client.set("allProduct", allProductData);

    // we have saved a network trip
    allProducts = allProductData;
  }

  return allProducts;
};
