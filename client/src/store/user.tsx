import { create } from "zustand";

interface User {
  userName?: string;
  accessToken: string;
}

interface UserStore {
  user: User | null;
  persist: boolean;
  login: (user: User) => void;
  logout: () => void;
  setPersist: (persist: boolean) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  persist: JSON.parse(localStorage.getItem("persist") || "false"),
  login: (user: User) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  setPersist: (persist) =>
    set(() => {
      localStorage.setItem("persist", JSON.stringify(persist));
      return {
        persist,
      };
    }),
}));
