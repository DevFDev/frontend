import { useRouter } from 'next/navigation'

import { SignInRequest, SignUpRequest } from '@/types/api/Auth.types'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { HTTPError } from 'ky'

import { SignIn, SignOut, SignUp } from '@/services/auth/auth'

export const useSignInMutation = (): UseMutationResult<
  Response, // 로그인 성공 시 토큰과 유저 정보 반환
  Error,
  SignInRequest, // { email: string; password: string }
  unknown
> => {
  const router = useRouter()

  return useMutation<Response, Error, SignInRequest>({
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

export const useSignOutMutation = (): UseMutationResult<
  Response, // 로그아웃은 단순 Response 반환
  Error,
  void,
  unknown
> => {
  const router = useRouter()

  return useMutation<Response, Error, void>({
    mutationFn: SignOut,
    onSuccess: result => {
      console.log('로그아웃 성공', result)
      alert('로그아웃 성공')
      router.push(`/login`)
    },
    onError: (error: unknown) => {
      console.error('Logout Error:', error)
      alert('로그아웃 요청 중 오류가 발생했습니다')
    },
  })
}

export const useSignUpMutation = (): UseMutationResult<
  Response, // 회원가입 성공 시 유저 정보 반환
  Error,
  SignUpRequest, // { email: string; password: string; name: string; gitHub?: string }
  unknown
> => {
  // const router = useRouter()

  return useMutation<Response, Error, SignUpRequest>({
    mutationFn: SignUp,
    onSuccess: result => {
      console.log(result)
    },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
        console.error('Sign-up error:', error.response)
      } else {
        console.error('Sign-up error:', error)
        alert('회원가입 요청 중 오류가 발생했습니다.')
      }
    },
  })
}
