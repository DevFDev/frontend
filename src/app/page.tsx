'use client'

import { useRouter } from 'next/navigation'

import axios from 'axios'

import { useAuthStore } from '@/stores/useAuthStore'

import { signOut } from '@/services/auth/auth'

export default function Home(): JSX.Element {
  const { logout } = useAuthStore()

  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/auth/sign-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        const errorResult = await response.json()
        console.error('Logout failed')
        alert('로그아웃 실패 프록시')
        return
      }
      console.log('Logout successful')
      alert('로그아웃 성공 프록시')
      router.push('/sign-in')
    } catch (error) {
      console.error('Logout error', error)
      alert('로그아웃 요청 중 오류 발생')
    }
  }

  return (
    <>
      <div>홈페이지</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  )
}
