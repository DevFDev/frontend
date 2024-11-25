'use client'

import { useRouter } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import { SignUpRequest } from '@/types/auth.types'

import { SignUp } from '@/services/auth/auth'

export default function SignUpPage(): JSX.Element {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>()

  const onSubmit: SubmitHandler<SignUpRequest> = async data => {
    try {
      const response = await SignUp(data)
      if (!response.ok) {
        console.error('회원가입 실패')
        alert('회원가입 실패')
        return
      }
      const result = await response.json()
      console.log('회원가입 성공:', result)

      alert('회원가입이 완료되었습니다!')
      router.push('/sign-in')
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생', error)
      alert('회원가입 중 오류 발생')
    }
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
