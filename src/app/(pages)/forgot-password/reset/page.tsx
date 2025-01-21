'use client'

import { Button } from '@/components/common/button'
import { PasswordInput } from '@/components/common/input'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'

export default function Reset(): JSX.Element {
  return (
    <div className='m-auto flex h-auto w-420 flex-col items-center gap-y-20 py-80'>
      <Text.Heading as='h2' variant='heading2' color='gray800'>
        새 비밀번호 설정
      </Text.Heading>
      <div className='flex flex-col items-center gap-y-4'>
        <Text.Heading as='h5' variant='heading5' color='gray800'>
          새로운 비밀번호를 입력해주세요!
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          이메일로 받으신 코드를 입력하고, <br />
          비밀번호를 재설정 할 수 있습니다.
        </Text.Body>
      </div>
      <div className='flex w-full flex-col gap-y-40'>
        <div className='flex flex-col gap-y-20'>
          <Label labelText='새 비밀번호'>
            <PasswordInput
              name='password'
              placeholder='비밀번호를 입력해주세요'
            />
            <Text.Caption variant='caption1' color='gray500' className='mt-4'>
              영문 대소문자, 숫자 2가지 이상으로 조합해 8자 이상 16자 이하로
              입력해주세요.
            </Text.Caption>
          </Label>
          <Label labelText='새 비밀번호 확인'>
            <PasswordInput
              name='passwordConfirmation'
              placeholder='비밀번호를 다시 한 번 입력해주세요'
            />
          </Label>
        </div>
        <Button disabled fullWidth>
          재설정
        </Button>
      </div>
    </div>
  )
}
