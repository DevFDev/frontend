'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Link } from '@/components/common/button'
import { Divider } from '@/components/common/divider'
import { Label } from '@/components/common/label'
import { Logo } from '@/components/common/logo'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'

import { useSignInMutation } from '@/queries/auth'

const signInSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하여야 합니다.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,16}$/,
      '영문 대소문자, 숫자 2가지 이상으로 조합해 입력해주세요.'
    ),
  rememberEmail: z.boolean().optional(),
})

type SignInForm = z.infer<typeof signInSchema>

export default function Login(): JSX.Element {
  const methods = useForm<SignInForm>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
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
            href='/forgot-password'
            className='p-0 text-body3 font-medium text-gray-600'
          >
            비밀번호 찾기
          </Link>
        </div>
        <Button disabled={!isValid} type='submit' fullWidth className='my-20'>
          로그인
        </Button>
        <div className='flex flex-row items-center gap-x-10'>
          <Divider isVertical={false} className='w-188' />
          <Text.Body variant='body3' color='gray500'>
            또는
          </Text.Body>
          <Divider isVertical={false} className='w-188' />
        </div>
        <Link variant='outlined' href='/sign-up' fullWidth className='mt-20'>
          회원가입
        </Link>
      </Form>
    </div>
  )
}
