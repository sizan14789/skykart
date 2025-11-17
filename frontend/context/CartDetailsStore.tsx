import { create } from "zustand";

type CartDetailsType = {
  cartDetails: CartItemType[];
  setCartDetails: (state: CartItemType[]) => void;
};

export const useCartDetailsStore = create<CartDetailsType>((set) => ({
  cartDetails: [],
  setCartDetails: (state: CartItemType[]) => set({ cartDetails: state }),
}));
