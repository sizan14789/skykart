import { create } from "zustand";

interface userStoreType {
  user: {
    username?: string;
    email?: string;
    role?: string[];
  };
  setUser: (UserInfo: object) => void;
}

export const useUserStore = create<userStoreType>((set) => ({
  user: {},
  setUser: (userInfo) => set({ user: userInfo }),
}));
