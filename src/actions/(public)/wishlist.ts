"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { wishlists, wishlistsItems } from "@/db/schema";
import { eq } from "drizzle-orm";

// getting the wishlists items
export async function getWishlistItems() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const userWishlist = await db.query.wishlists.findFirst({
    where: eq(session.user.id, wishlists.userId),
    with: {
      wishlistItems: {
        with: {
          products: {
            columns: {
              updatedAt: false,
              createdAt: false,
              status: false,
              id: false,
              storeId: false,
            },
            with: {
              variants: true,
            },
          },
        },
      },
    },
  });

  return userWishlist;
}

// Adding items to wishlist
export async function addWishlistItems(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.transaction(async (tx) => {
    // 1. Find first the wishlist exists or not
    let userWishlistId = await tx.query.wishlists.findFirst({
      where: eq(session.user.id, wishlists.userId),
      columns: {
        id: true,
      },
    });

    // if wishlists don't exists create one
    if (userWishlistId === undefined) {
      const [newWishlist] = await tx
        .insert(wishlists)
        .values({ userId: session.user.id })
        .returning({ id: wishlists.id });

      userWishlistId = newWishlist;
    }

    // now inserting a new wishlists items

    await tx
      .insert(wishlistsItems)
      .values({ wishlistsId: userWishlistId.id, productId: productId })
      .onConflictDoNothing({
        target: [wishlistsItems.wishlistsId, wishlistsItems.productId],
      });
  });
}

// removing items from wishlist
export async function removeWishlistItem(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.transaction(async (tx) => {
    const userWishlistId = await tx.query.wishlists.findFirst({
      where: eq(session.user.id, wishlists.userId),
      columns: {
        id: true,
      },
    });

    if (userWishlistId) {
      await tx
        .delete(wishlistsItems)
        .where(eq(wishlistsItems.productId, productId));
    }
  });
}
