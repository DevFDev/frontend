'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SignUpRequest } from '@/types/api/Auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/common/button'
import { Divider } from '@/components/common/divider'
import { Label } from '@/components/common/label'
import { Highlight, Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'

import { useSignUpMutation } from '@/queries/auth'

import { checkEmailDuplication } from '@/services/auth/auth'

interface SignUpForm extends SignUpRequest {
  passwordConfirmation: string
}

const signUpSchema = z
  .object({
    email: z
      .string()
      .nonempty('이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    name: z
      .string()
      .nonempty('이름을 입력해주세요.')
      .max(8, '이름은 최대 8자 이하여야 합니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 최대 16자 이하여야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,16}$/,
        '영문 대소문자, 숫자 2가지 이상으로 조합해 입력해주세요.'
      ),
    passwordConfirmation: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
    gitHub: z
      .string()
      .optional()
      .refine(
        value =>
          !value || /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(value),
        { message: '올바른 형식이 아닙니다.' }
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: '비밀번호가 일치하지 않습니다.',
      })
    }
  })

export default function SignUp(): JSX.Element {
  const methods = useForm<SignUpForm>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gitHub: '',
      passwordConfirmation: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const { mutate: signUp } = useSignUpMutation()

  const onSubmit = (data: SignUpForm) => {
    const { passwordConfirmation, ...signUpData } = data
    signUp({
      ...signUpData,
      gitHub: data.gitHub || '',
    })
  }

  return (
    <div className='m-auto flex h-auto w-420 flex-col pt-80'>
      <Text.Heading as='h2' variant='heading2' className='mb-20'>
        회원가입
      </Text.Heading>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label labelText='이메일' required className='mb-20'>
          <div className='flex items-baseline gap-x-8'>
            <Form.Text
              name='email'
              className='h-48 w-325'
              placeholder='이메일을 입력해주세요'
            />
            <Button type='button' className='w-87' size='lg'>
              중복확인
            </Button>
          </div>
        </Label>
        <Label labelText='이름' required className='mb-20'>
          <Form.Text name='name' placeholder='이름을 입력해주세요' />
        </Label>
        <Label labelText='비밀번호' required className='mb-20'>
          <Form.Password
            name='password'
            placeholder='비밀번호를 입력해주세요'
          />
          <Text.Caption variant='caption1' color='gray500' className='mt-4'>
            영문 대소문자, 숫자 2가지 이상으로 조합해 8자 이상 16자 이하로
            입력해주세요.
          </Text.Caption>
        </Label>
        <Label labelText='비밀번호 확인' required className='mb-20'>
          <Form.Password
            name='passwordConfirmation'
            placeholder='비밀번호를 다시 한번 입력해주세요'
          />
        </Label>
        <Label labelText='나의 Github 주소' className='mb-20'>
          <div className='flex gap-x-8'>
            <Text.Body as='p' variant='body1' color='gray500' className='mt-14'>
              https://github.com/
            </Text.Body>
            <Form.Text name='gitHub' className='w-276' />
          </div>
        </Label>
        <Form.Checkbox
          name='agreeToAll'
          variant='checkbox'
          label={
            <Text.Title variant='title2' weight='700'>
              전체동의
            </Text.Title>
          }
        />
        <div className='mb-40 mt-8 flex flex-col gap-y-8'>
          <Divider isVertical={false} />
          <Form.Checkbox
            name='age'
            variant='checkbox'
            label={
              <Text.Body variant='body1' color='gray500'>
                {'만 14세 미만입니다 '}
                <Highlight className='text-gray-800'>(필수)</Highlight>
              </Text.Body>
            }
          />
          <Form.Checkbox
            name='termsAgreement'
            variant='checkbox'
            label={
              <Text.Body variant='body1' color='gray500'>
                {'서비스 이용약관 동의 '}
                <Highlight className='text-gray-800'>(필수)</Highlight>
              </Text.Body>
            }
          />
          <Form.Checkbox
            name='userInfo'
            variant='checkbox'
            label={
              <Text.Body variant='body1' color='gray500'>
                {'개인정보 수집 및 이용 동의 '}
                <Highlight className='text-gray-800'>(필수)</Highlight>
              </Text.Body>
            }
          />
          <Form.Checkbox
            name='marketingConsent'
            variant='checkbox'
            label={
              <Text.Body variant='body1' color='gray500'>
                이벤트 등 마케팅 정보 수신 동의 (선택)
              </Text.Body>
            }
          />
        </div>
        <Button
          type='submit'
          disabled={!isValid}
          size='lg'
          fullWidth
          className='mb-110'
        >
          회원가입
        </Button>
      </Form>
    </div>
  )
}
