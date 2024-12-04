'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInRequest } from '@/types/api/auth.types'
import { useSignInMutation } from 'queries/auth'

export default function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>()

  const mutation = useSignInMutation()

  const onSubmit: SubmitHandler<SignInRequest> = data => {
    mutation.mutate(data)
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
