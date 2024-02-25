import { create } from "zustand";

import { ICard } from "@/types/card";

type TCardModalStore = {
  card: ICard | null;
  isOpen: boolean;
  setCard: (card: ICard) => void;
  onOpen: (card: ICard) => void;
  onClose: () => void;
};

const useCardModal = create<TCardModalStore>((set) => ({
  card: null,
  isOpen: false,
  setCard: (card: ICard) => set(() => ({ card })),
  onOpen: (card: ICard) => set(() => ({ isOpen: true, card })),
  onClose: () => set(() => ({ isOpen: false, card: null })),
}));

export default useCardModal;
