import { create } from "zustand";

interface ShopProductsStore {
  products: [];
  setProducts: (newProducts: []) => void;
}

export const useShopProductsStore = create<ShopProductsStore>((set) => ({
  products: [],
  setProducts: (newProducts) => set({ products: newProducts }),
}));
