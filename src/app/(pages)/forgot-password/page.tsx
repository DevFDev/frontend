'use client'

import { Button } from '@/components/common/button'
import { TextInput } from '@/components/common/input'
import { Label } from '@/components/common/label'
import { Highlight, Text } from '@/components/common/text'

export default function FindPassword(): JSX.Element {
  return (
    <div className='m-auto flex h-auto w-420 flex-col items-center gap-y-20 py-80'>
      <Text.Heading as='h2' variant='heading2' color='gray800'>
        비밀번호 찾기
      </Text.Heading>
      <div className='flex flex-col items-center gap-y-4'>
        <Text.Heading as='h5' variant='heading5' color='gray800'>
          비밀번호를 찾고자하는 이메일을 입력해주세요!
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          비밀번호 재설정 메일을 보내드립니다.
        </Text.Body>
      </div>
      <div className='flex w-full flex-col gap-y-40'>
        <Label labelText='이메일'>
          <TextInput name='email' placeholder='이메일을 입력해주세요' />
        </Label>
        <Button disabled fullWidth>
          다음
        </Button>
        <div className='flex flex-col items-center'>
          <Text.Body variant='body3' color='gray600'>
            이메일이 기억나지 않는다면?
            <Highlight>고객센터</Highlight>
          </Text.Body>
        </div>
      </div>
    </div>
  )
}
