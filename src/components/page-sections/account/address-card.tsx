"use client";

export enum AddressType {
  home = "HOME",
  default = "DEFAULT",
  work = "WORK",
}
export interface Address {
  type: AddressType | null;
  addressLane1: string;
  addressLane2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
const AddressCard = ({
  address,
  recipientName,
}: {
  address?: Address;
  recipientName?: string | null;
}) => {
  const AddressTypeLabels: Record<AddressType, string> = {
    [AddressType.home]: "Home",
    [AddressType.work]: "Work",
    [AddressType.default]: "Default",
  };

  const handleAddNew = () => {
    console.log("A new address will be added");
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
      <div className="col-span-1 px-4 py-2 border-2 border-gray-400 rounded-md">
        <div>
          <div>{address.type ? AddressTypeLabels[address.type] : null}</div>
        </div>
        <div id="card-container" className="text-sm flex flex-col gap-3 h-full">
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
