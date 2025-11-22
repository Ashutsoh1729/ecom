"use server";
import { auth } from "@/auth";
import { db } from "@/db/client";
import {
  cart,
  cartItems,
  orderItems,
  orders,
  productVariants,
  users,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface OrderDetails {
  shippingAddressId: string;
}

export async function placeOrder(details: OrderDetails) {
  const { shippingAddressId } = details;
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  const userId = session.user.id;

  return await db.transaction(async (tx) => {
    const cartData = await tx
      .select({
        cartId: cart.id,
        cartItemsId: cartItems.id,
        productId: cartItems.productId,
        variantId: cartItems.variantId,
        quantity: cartItems.quantity,
        price: productVariants.price,
      })
      .from(cartItems)
      .innerJoin(cart, eq(cart.id, cartItems.cartId))
      .innerJoin(productVariants, eq(productVariants.id, cartItems.variantId))
      .where(eq(cart.userId, userId));

    if (cartData.length === 0) {
      // Rollback the transaction if the cart is empty
      throw new Error("Cannot place an order for an empty cart.");
    }

    // 2. CALCULATE TOTAL AMOUNT
    // We use parseFloat/toFixed here since 'numeric' values are typically strings in DB results
    const totalAmount = cartData.reduce((sum, item) => {
      const price = item.price;
      return sum + price * item.quantity;
    }, 0);

    // 3. INSERT ORDER HEADER

    const [newOrder] = await tx
      .insert(orders)
      .values({ userId, shippingAddressId, totalAmount })
      .returning({ id: orders.id });

    const orderId = newOrder.id;

    // 4. PREPARE ORDER ITEMS DATA (Batch Insert)

    const orderItemsToInsert = cartData.map((item) => ({
      orderId: orderId, // Link to the newly created order
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      // CRITICAL: Lock in the price at the time of order
      priceAtOrder: item.price,
    }));

    // 5. INSERT ORDER ITEMS
    // Drizzle can handle batch inserts efficiently

    await tx.insert(orderItems).values(orderItemsToInsert);

    // 6. CLEAN UP: Delete cart items
    // We use the cartId from the fetched data
    const cartIdToDelete = cartData[0].cartId;

    await tx.delete(cartItems).where(eq(cartItems.cartId, cartIdToDelete));

    // 7. CLEAN UP: Update cart timestamp (optional, but useful)
    await tx
      .update(cart)
      .set({ updatedAt: new Date() })
      .where(eq(cart.id, cartIdToDelete));

    return orderId;
  });
}
