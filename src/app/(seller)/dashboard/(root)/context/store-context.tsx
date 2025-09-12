"use client";

import { StoreTableDataInterface } from "@/lib/logic";
import { createContext, ReactNode, useContext } from "react";

// It is going to use provide context to the children components of a layout file

export type storesList = StoreTableDataInterface[];

// 1. Create the Context with a default value
// The default value is used when a component tries to access the context
// without a matching provider higher up in the tree.

const StoreContext = createContext<storesList | null>(null);

// 2. Create a Provider Component
// This component will wrap parts of your app and make the user data
// available to any component inside of it.

interface StoreProviderProps {
  children: ReactNode;
  value: storesList | null; // The data you want to provide
}

export function StoreProvider({ children, value }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
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
