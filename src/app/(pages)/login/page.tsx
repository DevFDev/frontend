'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SignInRequest } from '@/types/api/Auth.types'

import { Button, Link } from '@/components/common/button'
import { Label } from '@/components/common/label'
import { Logo } from '@/components/common/logo'
import { Form } from '@/components/shared/form'

import { useSignInMutation } from '@/queries/auth'

/**
 * TODO
 * 1. 유효성 검사 부분 zod로 작업 및 관심사 분리 (name 말고 다른 prop으로)
 * 2. 로그인, 회원가입 버튼 사이 또는 부분 구분선 컴포넌트 추가되면 지정
 * 3. 비밀번호 찾기 페이지 디자인 요청 및 구현
 */

interface SignInForm extends SignInRequest {
  rememberEmail?: boolean
}

export default function Login(): JSX.Element {
  const methods = useForm<SignInForm>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberEmail: false,
    },
  })

  const {
    formState: { isValid },
    setValue,
  } = methods

  const { mutate: signIn } = useSignInMutation()

  const onSubmit = (data: SignInForm) => {
    if (data.rememberEmail) {
      localStorage.setItem('rememberedEmail', data.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
    signIn({
      email: data.email,
      password: data.password,
    })
  }

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setValue('email', rememberedEmail)
      setValue('rememberEmail', true)
    }
  }, [setValue])

  return (
    <div className='m-auto my-240 flex h-auto w-420 flex-col'>
      <div className='m-auto mb-36'>
        <Logo />
      </div>
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Label labelText='이메일' className='mb-20'>
          <Form.Text name='email' placeholder='이메일을 입력해주세요' />
        </Label>
        <Label labelText='비밀번호' className='mb-20'>
          <Form.Password
            name='password'
            placeholder='비밀번호를 입력해주세요'
          />
        </Label>
        <div className='flex h-24 items-center justify-between'>
          <Form.Checkbox
            variant='checkbox'
            name='rememberEmail'
            label='이메일 기억하기'
            className='ml-4 h-20 text-body3 font-medium text-gray-600'
          />
          <Link
            variant='text'
            href='/find-password'
            className='p-0 text-body3 font-medium text-gray-600'
          >
            비밀번호 찾기
          </Link>
        </div>
        <Button disabled={!isValid} type='submit' fullWidth className='my-20'>
          로그인
        </Button>
        <span className='flex flex-col items-center text-body3 text-gray-600'>
          또는
        </span>
        <Link variant='outlined' href='/sign-up' fullWidth className='mt-20'>
          회원가입
        </Link>
      </Form>
    </div>
  )
}
