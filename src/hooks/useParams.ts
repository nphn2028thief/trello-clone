import { create } from "zustand";

type TParams = {
  id: string;
  setParams: (id: string) => void;
};

const useParams = create<TParams>((set) => ({
  id: "",
  setParams: (id) => set(() => ({ id })),
}));

export default useParams;
