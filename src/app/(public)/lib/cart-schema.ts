"use client";
// cart schema
import { z } from "zod";

//  NOTE: Now the state is in sync with local storage which it will use for storing shopping bag items, it is only for the un-authenticated user

export const CartItemSchema = z.object({
  // slug: z.string(),
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string(),
  variantName: z.string(),
  productName: z.string(),
  imageUrl: z.string(),
  quantity: z.number().min(1, "Item quantity can't be less than 1").default(1),
  price: z.number().min(0, "Can't be non-negative"),
});

export type CartItemType = z.infer<typeof CartItemSchema>;

// cart state management
