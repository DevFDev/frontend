'use client'

import { useForm } from 'react-hook-form'

import { SignUpRequest } from '@/types/api/Auth.types'

import { Button } from '@/components/common/button'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'

import { useSignUpMutation } from '@/queries/auth'

interface SignUpForm extends SignUpRequest {
  passwordConfirmation: boolean
}
/**
 * 1. 회원가입 체크박스 백엔드 api 수정 필요할듯
 */

export default function SignUp(): JSX.Element {
  const methods = useForm<SignUpForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gitHub: '',
    },
  })

  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methods

  const emailValue = watch('email')
  const isEmailValid = emailValue && !errors.email
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
            <Button disabled={!isEmailValid} className='w-87' size='lg'>
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
        </Label>
        <Label labelText='비밀번호 확인' required className='mb-20'>
          <Form.Password
            name='passwordConfirmation'
            placeholder='비밀번호를 다시 한번 입력해주세요'
          />
        </Label>
        <Label labelText='나의 Github 주소' className='mb-20'>
          <div className='flex flex-row items-center gap-x-8'>
            <Text.Body as='p' variant='body1' color='gray500'>
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
        {/**
         * TODO
         * 1. 구분선 컴포넌트 들어가야함
         * 2. font-weight 적용 안 되는 문제 해결
         * */}
        <div className='mb-40 mt-16 flex flex-col gap-y-8'>
          <Form.Checkbox
            name='age'
            variant='checkbox'
            label={
              <div className='flex gap-x-4'>
                <Text.Body variant='body1' color='gray500' weight='500'>
                  만 14세 미만입니다
                </Text.Body>
                <Text.Body variant='body1' weight='500'>(필수)</Text.Body>
              </div>
            }
          />
          <Form.Checkbox
            name='termsAgreement'
            variant='checkbox'
            label={
              <div className='flex gap-x-4'>
                <Text.Body variant='body1' color='gray500'>
                  서비스 이용약관 동의
                </Text.Body>
                <Text.Body variant='body1'>(필수)</Text.Body>
              </div>
            }
          />
          <Form.Checkbox
            name='userInfo'
            variant='checkbox'
            label={
              <div className='flex gap-x-4'>
                <Text.Body variant='body1' color='gray500'>
                  개인정보 수집 및 이용 동의
                </Text.Body>
                <Text.Body variant='body1'>(필수)</Text.Body>
              </div>
            }
          />
          <Form.Checkbox
            name='marketingConsent'
            variant='checkbox'
            label='이벤트 등 마케팅 정보 수신 동의 (선택)'
          />
          <div className='ml-30 flex gap-x-20'>
            <Form.Checkbox
              name='email'
              variant='check'
              label='이메일'
              className='ml-4'
            />
            <Form.Checkbox
              name='sms'
              variant='check'
              label='문자'
              className='ml-4'
            />
          </div>
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
