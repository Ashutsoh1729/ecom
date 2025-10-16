"use client";

import { createContext, ReactNode, useContext } from "react";
import { CartItemType } from "../lib/cart-schema";

const DbCartItemsContext = createContext<CartItemType[] | []>([]);

interface DbCartItemsProviderProps {
  children: ReactNode;
  value: CartItemType[];
}

export const DbCartItemsProvider = ({
  children,
  value,
}: DbCartItemsProviderProps) => {
  return (
    <DbCartItemsContext.Provider value={value}>
      {children}
    </DbCartItemsContext.Provider>
  );
};

export const useCartItems = () => {
  const context = useContext(DbCartItemsContext);
  if (context === undefined) {
    throw new Error(
      "The use cart items should be used inside a cart context provider",
    );
  }
  return context;
};
