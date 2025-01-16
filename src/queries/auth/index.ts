'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { SignIn, SignOut, SignUp } from '@/services/auth/auth'

export const useSignInMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignIn,
    onSuccess: result => {
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

export const useSignUpMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignUp,
    onSuccess: result => {},
    onError: (error: any) => {
      console.error('Sign-up error:', error.response)
      alert(error.response?.message || '회원가입 요청 중 오류가 발생했습니다.')
    },
  })
}
