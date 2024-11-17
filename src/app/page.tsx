'use client'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/store/auth'
import axios from 'axios'

export default function Home(): JSX.Element {
  const { logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    ;async () => {
      await axios.post('/v1/auth/sign-in', {}, { withCredentials: true })
    }
    router.push('/sign-in')
    console.log('로그아웃 성공')
  }

  return (
    <>
      <div>홈페이지</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  )
}
