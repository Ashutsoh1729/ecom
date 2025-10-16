"use client";

import { AddressFormType } from "@/components/modals/address-modal";
import { createContext, ReactNode, useContext } from "react";

type AddressContextType = AddressFormType & {
  id: string;
};

const AddressContext = createContext<AddressContextType[] | null>(null);

interface AddressProviderProps {
  children: ReactNode;
  value: AddressContextType[];
}

export const AddressContextProvider = ({
  children,
  value,
}: AddressProviderProps) => {
  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error(
      "The address context should be used inside of an context provider",
    );
  }
  return context;
};
