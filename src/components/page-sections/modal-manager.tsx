"use client";

import { useModalStore } from "@/util/states/modal";
import { EditProfileModal, LoginModal } from "./text-components";
import SellerApplicationModal from "../util/modals/seller-modal";
import { Cross, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

// A mapping from modal type to the actual component
const modalComponents = {
  login: LoginModal,
  editProfile: EditProfileModal,
  sellerCreating: SellerApplicationModal,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 "
      onClick={closeModal}
    >
      <div
        className="relative w-full lg:max-w-xl rounded-lg bg-white pb-6 shadow-lg"
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
