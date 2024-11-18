'use client'

import { useRouter } from 'next/navigation'

import axios from 'axios'

import { useAuthStore } from '@/services/store/auth'

export default function Home(): JSX.Element {
  const { logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post('/v1/auth/logout', {}, { withCredentials: true })
      console.log('서버 로그아웃 성공')

      logout()

      router.push('/sign-in')
      console.log('로그아웃 성공')
    } catch (error) {
      console.error('로그아웃 실패:', error)
      alert('로그아웃에 실패했습니다.')
    }
  }

  return (
    <>
      <div>홈페이지</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  )
}
