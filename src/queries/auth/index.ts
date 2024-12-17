import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { SignIn, SignOut, SignUp } from '@/services/auth/auth'
import { setTokenTimeout } from '@/services/auth/buffer'

export const useSignInMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignIn,
    onSuccess: result => {
      alert('로그인 성공')
      setTokenTimeout()
      router.push(`/`)
    },
    onError: (error: unknown) => {
      alert('로그인 요청 중 오류가 발생했습니다')
    },
  })
}

export const useSignOutMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: SignOut,
    onSuccess: result => {
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
    onSuccess: result => {
      alert('회원가입 성공')
      router.push(`/sign-in`)
    },
    onError: (error: unknown) => {
      console.error('SignUp Error:', error)
      alert('회원가입 요청 중 오류가 발생했습니다')
    },
  })
}
