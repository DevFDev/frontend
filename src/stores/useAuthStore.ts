import { tokenBufferTime, tokenExpiredTime } from '@/constants/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { proxyApi } from '@/services/api'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  login: user => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))

interface TokenStore {
  timeoutId: NodeJS.Timeout | null
  setTokenTimeout: () => void
  clearTokenTimeout: () => void
  requestNewToken: () => Promise<void>
  initializeTokenTimeout: () => void
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set, get) => ({
      timeoutId: null,

      // 토큰 갱신 요청
      requestNewToken: async () => {
        const response = await proxyApi.post('api/auth/refresh', {})
        if (response.ok) {
          console.log('토큰 갱신 요청 성공')
          get().setTokenTimeout() // 갱신 성공 시 타임아웃 다시 설정
        } else {
          console.error('토큰 갱신 요청 실패')
        }
      },
      // 타임아웃 설정
      setTokenTimeout: () => {
        get().clearTokenTimeout()
        const timeToRefresh = tokenExpiredTime- tokenBufferTime
        const timeoutId = setTimeout(() => {
          get().requestNewToken()
        }, timeToRefresh)

        set({ timeoutId })
        console.log(
          `타임아웃 설정 완료: ${timeToRefresh / 1000}초 후 토큰 갱신`
        )
      },

      clearTokenTimeout: () => {
        const currentTimeoutId = get().timeoutId
        if (currentTimeoutId) {
          clearTimeout(currentTimeoutId)
          set({ timeoutId: null })
          console.log('타임아웃 제거 완료')
        }
      },

      initializeTokenTimeout: () => {
        const currentTimeoutId = get().timeoutId
        if (!currentTimeoutId) {
          console.log('페이지 새로고침으로 타임아웃 재설정')
          get().setTokenTimeout()
        }
      },
    }),
    {
      name: 'token-store',
      partialize: state => ({
        timeoutId: state.timeoutId,
        setTokenTimeout: state.setTokenTimeout,
        clearTokenTimeout: state.clearTokenTimeout,
        requestNewToken: state.requestNewToken,
        initializeTokenTimeout: state.initializeTokenTimeout,
      }),
    }
  )
)
