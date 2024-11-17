import { AuthState } from '@/types/login.types'
import { create } from 'zustand'

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  login: user => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))
