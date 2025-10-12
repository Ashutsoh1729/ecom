"use client";

import { AddressFormType } from "@/components/modals/address-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Address } from "@/util/data";
import { useModalStore } from "@/util/states/modal";
import { Trash } from "lucide-react";

const AddressCard = ({
  address,
  recipientName,
}: {
  address?: Address;
  recipientName?: string | null;
}) => {
  // console.log(address?.type);
  const { openModal } = useModalStore();

  const handleAddNew = () => {
    console.log("A new address will be added");
    openModal("addressCreating");
  };

  if (!address) {
    return (
      <div
        onClick={handleAddNew}
        className="flex h-full col-span-1 px-4 pt-2 min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-6 text-center transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
      >
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="font-semibold text-gray-700">Add a New Address</span>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-1  border-2 border-gray-400 rounded-md">
        <div className="border-b-slate-400 border-b-2 px-4 py-2">
          <div className="text-slate-500 font-medium text-sm">
            {address.type}
          </div>
        </div>
        <div
          id="card-container"
          className="text-sm flex flex-col gap-3 h-full px-4 py-3"
        >
          {recipientName && (
            <div className="text-base font-medium ">{recipientName}</div>
          )}
          <div>
            <div>{address.addressLane1}</div>
            {address.addressLane2 && <div>{address.addressLane2}</div>}
            {address.landmark && <div>{address.landmark}</div>}
            <div>
              <span>{address.city}</span>
              <span>, {address.state}</span>
              <span>, {address.country}</span>
            </div>
            <div>
              <span>Postal Code: {address.postalCode}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;

type newAddressType = AddressFormType & {
  id: string;
};
interface Address_2_Interface {
  data?: newAddressType;
}

export function Address_2({ data }: Address_2_Interface) {
  const { openModal } = useModalStore();
  const handleAddNew = () => {
    console.log("A new address will be added");
    openModal("addressCreating");
  };

  // TODO: Creating the card to show the address

  if (!data) {
    return (
      <div
        onClick={handleAddNew}
        className="flex h-full col-span-1 px-4 pt-2 min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-6 text-center transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
      >
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="font-semibold text-gray-700">Add a New Address</span>
      </div>
    );
  }

  const address = data;
  const handleCardDelete = async () => {
    console.log("you want to delete the card");
  };
  return (
    <Card className="p-0">
      <CardHeader className="flex py-2 items-center justify-between border-b-2 ">
        <CardTitle className="text-base">
          {address.addressType != "Other"
            ? address.addressType
            : address.otherAddressType}
        </CardTitle>
        <button
          onClick={handleCardDelete}
          className="bg-red-50 p-2 rounded-md hover:cursor-pointer hover:bg-red-400 transition-all duration-200"
        >
          <Trash size={15} className="text-red-500" />
        </button>
      </CardHeader>
      <CardContent>
        {address.recipientName && (
          <div className="text-base font-medium ">{address.recipientName}</div>
        )}
        <div>
          <div>{address.lane1}</div>
          {address.lane2 && <div>{address.lane2}</div>}
          {address.landmark && <div>{address.landmark}</div>}
          <div>
            <span>{address.city}</span>
            <span>, {address.state}</span>
            <span>, {address.country}</span>
          </div>
          <div>
            <span>Postal Code: {address.postalCode}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
