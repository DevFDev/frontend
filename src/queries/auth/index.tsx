'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { SignUpSuccessModalContent } from '@/components/auth/SignUpSuccessModalContent'

import { useAuthStore } from '@/stores/useAuthStore'
import useModalStore from '@/stores/useModalStore'

import { SignIn, SignOut, SignUp } from '@/services/auth/auth'

export const useSignInMutation = (
  setErrorMessage: (message: string) => void
) => {
  const router = useRouter()
  const login = useAuthStore(state => state.login)

  return useMutation({
    mutationFn: SignIn,
    onSuccess: data => {
      login(data.result)
      router.push('/')
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        setErrorMessage('입력한 내용을 다시 한번 확인해 주세요. ')
      } else {
        console.error('Login Error:', error)
        setErrorMessage('로그인 요청 중 오류가 발생했습니다.')
      }
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
      router.push(`/signin`)
    },
    onError: (error: unknown) => {
      console.error('Logout Error:', error)
      alert('로그아웃 요청 중 오류가 발생했습니다')
    },
  })
}

export const useSignUpMutation = () => {
  const openModal = useModalStore(state => state.openModal)

  return useMutation({
    mutationFn: SignUp,
    onSuccess: data => {
      openModal(<SignUpSuccessModalContent userName={data.result.name} />)
    },
    // 에러 상태 세분화하기
    onError: (error: any) => {
      alert(error.response?.message || '회원가입 요청 중 오류가 발생했습니다.')
    },
  })
}
