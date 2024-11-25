'use client'

import { useRouter } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import { SignInRequest } from '@/types/auth.types'

export default function LoginPage(): JSX.Element {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>()

  const onSubmit: SubmitHandler<SignInRequest> = async data => {
    try {
      const response = await fetch(`/api/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error('Login failed')
        alert('로그인 실패 프록시 전달')
        return
      }

      const result = await response.json()
      console.log('Login successful:', result)
      alert('로그인 성공')
      router.push('/')
    } catch (error) {
      console.error('Login error', error)
      alert('로그인 요청 중 오류 발생')
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='email'
            {...register('email', { required: '이메일을 입력하세요.' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            id='password'
            type='password'
            {...register('password', { required: '비밀번호를 입력하세요.' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}
