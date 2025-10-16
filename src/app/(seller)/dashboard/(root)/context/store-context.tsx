"use client";

import { getSellerStoreAllDataOutputInterface } from "@/lib/data/products";
import { StoreTableDataInterface } from "@/lib/logic";

// createContext is for creating context and providing it, as it works as a wrapper element
// Then useContext is used for extracting the context,if it exists inside the wapper element

import { createContext, ReactNode, useContext } from "react";

// It is going to use provide context to the children components of a layout file

export type storesList = StoreTableDataInterface[];
export type allDataListType = getSellerStoreAllDataOutputInterface[];

// 1. Create the Context with a default value
// The default value is used when a component tries to access the context
// without a matching provider higher up in the tree.

const StoreContext = createContext<storesList | null>(null);
// const ProductContext = createContext<productList | null>(null);
const AllStoresDataContext = createContext<allDataListType | null>(null);

// 2. Create a Provider Component
// This component will wrap parts of your app and make the user data
// available to any component inside of it.

interface StoreProviderProps {
  children: ReactNode;
  value: storesList | null; // The data you want to provide
}

/* interface ProductProviderProps {
  children: ReactNode;
  value: productList | null;
} */

interface AllStoresDataProviderProps {
  children: ReactNode;
  value: allDataListType | null;
}

export function StoreProvider({ children, value }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

/* export function ProductProvider({ children, value }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
} */

export function AllStoreDataProvider({
  children,
  value,
}: AllStoresDataProviderProps) {
  return (
    <AllStoresDataContext.Provider value={value}>
      {children}
    </AllStoresDataContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
// This is a best practice to avoid importing `useContext` and `UserContext`
// in every consumer component.

export function useStoreList() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreList must be inside of a StoreProvider");
  }
  // The context can be null if the user is not logged in.
  // Your components should handle this case.

  return context;
}

/* export function useProductList() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductList must be inside of a ProductProvider");
  }
  return context;
} */

export function useAllStoresDataList() {
  const context = useContext(AllStoresDataContext);
  if (context === undefined) {
    throw new Error("useAllStoresData context must be inside of Provider");
  }
  return context;
}
