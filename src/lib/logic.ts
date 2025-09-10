// lib/user-data.ts

import { cache } from "react";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { stores, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// The 'cache' function ensures that if this function is called multiple times
// with the same inputs in a single request, the database is only hit once.
export const getUserRole = cache(async (): Promise<"Seller" | "Buyer"> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return "Buyer"; // Default role for guests
  }

  try {
    const roleData = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId));

    // If user exists in DB, return their role, otherwise default
    return roleData[0]?.role ?? "Buyer";
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return "Buyer"; // Return a default role on error
  }
});

export interface StoreTableDataInterface {
  storeName: string;
  isActive: boolean;
  storeId: string;
}

export const getStoreList = cache(
  async (): Promise<StoreTableDataInterface[]> => {
    const session = await auth();
    const userId = session?.user.id;
    const sellerId = session?.user.sellerId;

    if (!userId) {
      throw new Error("The userId is not available in the session");
    }
    if (!sellerId) {
      throw new Error("The seller id is not available in the session");
    }

    try {
      const roleData = await db
        .select({
          storeName: stores.storeName,
          isActive: stores.isActive,
          storeId: stores.id,
        })
        .from(stores)
        .where(eq(stores.sellerId, sellerId));

      // If user exists in DB, return their role, otherwise default
      return roleData;
    } catch (error) {
      // TODO: Handle this catch error

      console.error("Failed to fetch user role:", error);
      // return "Buyer"; // Return a default role on error
      return [{ storeName: "", isActive: false, storeId: "asfasdf" }];
    }
  },
);
