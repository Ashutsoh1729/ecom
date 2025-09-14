import { db } from "@/db/client";
import { products, stores } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { StoreTableDataInterface } from "../logic";
import { auth } from "@/auth";

export interface productDataInterface {
  name: string;
  storeId: string;
  status: "draft" | "active" | "archived";
  variants: { price: number; quantity: number }[];
}

export const getProductList = async ({
  storeList,
}: {
  storeList: StoreTableDataInterface[];
}): Promise<productDataInterface[]> => {
  // TODO: 1. get the stores list in the name of the user, 2. map through them and get all the products associated with thoes stores, 3. return them in a list format

  const storeIdList = storeList.map((store) => store.storeId);

  const listOfProducts = await db.transaction(async (tx) => {
    // here we can access multiple time db with just one call
    const allProductsWithVariants = await tx.query.products.findMany({
      where: inArray(products.storeId, storeIdList),
      columns: {
        storeId: true,
        name: true,
        status: true,
      },
      with: {
        variants: {
          columns: {
            price: true,
            quantity: true,
          },
        },
      },
    });

    return allProductsWithVariants;
  });

  // adding the store name
  // const finalProductList = listOfProducts.map((product) => {});

  return listOfProducts;
};

export interface getSellerStoreAllDataOutputInterface {
  id: string;
  storeName: string;
  slug: string;
  isActive: boolean;
  products: {
    id: string;
    name: string;
    slug: string;
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
