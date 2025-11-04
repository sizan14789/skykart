import { create } from "zustand";

interface SearchProductsStore {
  search: string;
  setSearch: (search: string) => void;
}

export const useSearchProductsStore = create<SearchProductsStore>((set) => ({
  search: "",
  setSearch: (search:string) => set({ search: search }),
}));
