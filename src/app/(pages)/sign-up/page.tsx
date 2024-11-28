'use client'

// import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SignUpRequest } from '@/types/api/auth.types'
import { useSignUpMutation } from 'queries/useSignUp'

export default function SignUpPage(): JSX.Element {
  // const router = useRouter()
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<SignUpRequest>()
  const mutation = useSignUpMutation()

  const onSubmit: SubmitHandler<SignUpRequest> = data => {
    mutation.mutate(data)
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='email'
            {...register('email', { required: '이메일을 입력하세요.' })}
          />
        </div>
        <div>
          <label htmlFor='name'>이름</label>
          <input
            id='name'
            type='name'
            {...register('name', { required: '이름을 입력하세요.' })}
          />
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            id='password'
            type='password'
            {...register('password', { required: '비밀번호를 입력하세요.' })}
          />
        </div>
        <div>
          <label htmlFor='gitHub'>깃허브 주소</label>
          <input
            id='gitHub'
            type='gitHub'
            {...register('gitHub', { required: '깃허브 주소를 입력하세요.' })}
          />
        </div>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}
