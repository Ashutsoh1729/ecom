"use client";

import { useModalStore } from "@/util/states/modal";
import { EditProfileModal, LoginModal } from "./text-components";
import SellerApplicationModal from "../modals/create-seller-modal";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import CreateStoreModal from "../modals/create-store-modal";
import CreateProductModal from "../modals/create-product-modal";

// A mapping from modal type to the actual component
const modalComponents = {
  login: LoginModal,
  editProfile: EditProfileModal,
  sellerCreating: SellerApplicationModal,
  storeCreating: CreateStoreModal,
  productCreating: CreateProductModal,
};

const ModalManager = () => {
  const { activeModal, closeModal } = useModalStore();

  // TODO: Still the error is not completly gone. the background is not transparent and i need to work on it.

  if (!activeModal) {
    return null;
  }
  const ActiveModalComponent = modalComponents[activeModal];

  return (
    // Your common wrapper with the dark overlay and centering

    <div
      className="fixed inset-0 z-50 flex items-start pt-24 pb-12 justify-center bg-gray-900/80 overflow-y-auto "
      onClick={closeModal}
    >
      <div
        className="relative w-full lg:max-w-xl  overflow-y-auto rounded-lg bg-white py-2  shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex justify-end items-center h-full py-2 pr-4">
          <Button
            variant={"ghost"}
            onClick={closeModal}
            className="hover:cursor-pointer"
          >
            <X />
          </Button>
        </div>
        {/* ... close button ... */}
        <Separator />
        <div className="px-6 pt-3">
          <ActiveModalComponent />
        </div>
      </div>
    </div>
  );
};

export default ModalManager;
