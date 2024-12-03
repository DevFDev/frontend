'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { SignIn } from '@/services/auth/auth'

export const useSignInMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignIn,
    onSuccess: (result) => {
      console.log('Login successful', result)
      alert('로그인 성공')
      router.push(`/`)
    },
    onError: (error: unknown) => {
      console.error('Login Error:', error)
      alert('로그인 요청 중 오류가 발생했습니다')
    },
  })
}
