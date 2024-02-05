import { create } from 'zustand'

export const useUserStore = create((set) => ({
  currentUser: undefined,
  setUser: (user) => set({ currentUser: user })
}))
