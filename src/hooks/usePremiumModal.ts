import { create } from "zustand";

type TPremiumStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const usePremiumModal = create<TPremiumStore>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));

export default usePremiumModal;
