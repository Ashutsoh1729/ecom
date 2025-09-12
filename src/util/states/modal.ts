import { create } from "zustand";

// 1. Define the possible modal types
export type ModalType =
  | "login"
  | "editProfile"
  | "sellerCreating"
  | "storeCreating"
  | "productCreating";

interface ModalState {
  activeModal: ModalType | null; // 2. State now holds the type of modal, or null
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null, // Initially, no modal is active
  openModal: (modalType) => set({ activeModal: modalType }), // 3. Set the active modal type
  closeModal: () => set({ activeModal: null }), // 4. Clear the active modal
}));
/* 
interface sellerModal {
  isOpen: boolean;
  openSellerModal: () => void;
  closeSellerModal: () => void;
}

// -- for seller modal --

export const useSellerModal = create<sellerModal>((set) => ({
  isOpen: false,
  openSellerModal: () => set({ isOpen: true }),
  closeSellerModal: () => set({ isOpen: false }),
})); */
