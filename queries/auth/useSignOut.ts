'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { SignOut } from '@/services/auth/auth'

export const useSignOutMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignOut,
    onSuccess: result => {
      console.log('로그아웃 성공', result)
      alert('로그아웃 성공')
      router.push(`/sign-in`)
    },
    onError: (error: unknown) => {
      console.error('Logout Error:', error)
      alert('로그아웃 요청 중 오류가 발생했습니다')
    },
  })
}
