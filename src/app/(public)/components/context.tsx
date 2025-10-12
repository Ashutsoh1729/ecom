"use client";
import { getAllProductInterface } from "@/lib/data/products";
import { createContext, ReactNode, useContext } from "react";

export type allProductContextType = getAllProductInterface[];

const AllProductContext = createContext<allProductContextType | null>(null);
interface allProductProviderProps {
  children: ReactNode;
  value: allProductContextType;
}

export const AllProductProvider = ({
  children,
  value,
}: allProductProviderProps) => {
  return (
    <AllProductContext.Provider value={value}>
      {children}
    </AllProductContext.Provider>
  );
};

export function useAllProducts() {
  const context = useContext(AllProductContext);
  if (context === undefined) {
    throw new Error("useStoreList must be inside of a StoreProvider");
  }
  // The context can be null if the user is not logged in.
  // Your components should handle this case.

  return context;
}
