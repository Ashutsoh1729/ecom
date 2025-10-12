// cart schema
import { z } from "zod";

//  NOTE: Now the state is in sync with local storage which it will use for storing shopping bag items

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

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      // Initial state
      items: [],

      // Actions
      addItem: (item) => {
        set((state) => {
          // ... your existing logic for addItem
          const existingItem = state.items.find(
            (i) =>
              i.productId === item.productId && i.variantId === item.variantId,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.productId === productId && item.variantId === variantId),
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      // 3. Configure the `persist` middleware
      name: "bag-items", // This is the key for localStorage
      storage: createJSONStorage(() => localStorage), // The storage engine to use
    },
  ),
);
