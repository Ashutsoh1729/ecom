"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { cart, cartItems } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function getCartFromDB() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const dbCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          products: true,
          variants: true,
        },
      },
    },
  });

  if (!dbCart) return [];

  return dbCart.items.map((i) => ({
    productId: i.productId,
    variantId: i.variantId,
    quantity: i.quantity,
    variantName: i.variants.name,
    productName: i.products.name,
    imageUrl: i.products.mainImageUrl,
    price: i.variants.price,
  }));
}

export async function addCartItem(
  productId: string,
  variantId: string,
  quantity: number,
) {
  const session = await auth();
  if (!session?.user?.id) return;

  //  NOTE: New version is added at the bottom, v1

  /* // find whther cart exists on this user id
  const dbCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
  });

  // if don't exists create a new one
  const cartId =
    dbCart?.id ??
    (
      await db
        .insert(cart)
        .values({ userId: session.user.id })
        .returning({ id: cart.id })
    )[0].id;

  // insert an item to the cart items using the cart id
  await db
    .insert(cartItems)
    .values({
      cartId,
      productId: productId,
      variantId: variantId,
      quantity: quantity,
    })
    // if the item exists then modify the item quantity
    .onConflictDoUpdate({
      target: [cartItems.cartId, cartItems.productId, cartItems.variantId],
      set: { quantity: sql`${cartItems.quantity} + ${quantity}` },
    }); */

  //  NOTE: v2

  await db.transaction(async (tx) => {
    // 1. FIND OR CREATE CART 🛒
    // Find the cart first
    let dbCart = await tx.query.cart.findFirst({
      where: eq(cart.userId, session.user.id),
      columns: {
        id: true,
      },
    });

    // If cart doesn't exist, create it.
    if (!dbCart) {
      // Note: Use 'tx' for the insertion
      const [newCart] = await tx
        .insert(cart)
        .values({ userId: session.user.id })
        .returning({ id: cart.id });

      dbCart = newCart;
    }

    // Guard clause to ensure we have a cart ID
    if (!dbCart?.id) {
      throw new Error("Failed to find or create cart ID.");
    }
    const cartId = dbCart.id;

    // 2. INSERT OR UPDATE CART ITEM ➕
    // Use the cartId from the previous step and 'tx' for the operation
    await tx
      .insert(cartItems)
      .values({
        cartId: cartId,
        productId: productId,
        variantId: variantId,
        quantity: quantity,
      })
      // onConflictDoUpdate will handle the logic of "if exists, update quantity"
      .onConflictDoUpdate({
        target: [cartItems.cartId, cartItems.productId, cartItems.variantId],
        set: { quantity: sql`${cartItems.quantity} + ${quantity}` },
      });
  });
}

export async function updateCartItem(
  productId: string,
  variantId: string,
  quantity: number,
) {
  const session = await auth();
  if (!session?.user?.id) return;

  const dbCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
  });

  if (dbCart) {
    await db
      .update(cartItems)
      .set({ quantity: quantity })
      .where(
        and(
          eq(cartItems.cartId, dbCart.id),
          eq(cartItems.productId, productId),
          eq(cartItems.variantId, variantId),
        ),
      );
  }
}

export async function removeCartItem(productId: string, variantId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  const dbCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
  });

  if (dbCart) {
    try {
      await db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.cartId, dbCart?.id),
            eq(cartItems.productId, productId),
            eq(cartItems.variantId, variantId),
          ),
        );
    } catch (error) {
      console.error(error);
    }
  }
}
