import { create } from "zustand";

interface User {
  userName: string;
  accessToken: string;
}

interface UserStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  login: (user: User) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
}));
