'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { SignUp } from '@/services/auth/auth'

export const useSignUpMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignUp,
    onSuccess: (result) => {
      console.log('회원가입 성공', result)
      alert('회원가입 성공')
      router.push(`/sign-in`)
    },
    onError: (error: unknown) => {
      console.error('SignUp Error:', error)
      alert('회원가입 요청 중 오류가 발생했습니다')
    },
  })
}
