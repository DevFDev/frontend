'use client'

import { Controller, useForm } from 'react-hook-form'

import { commuintyCategoryOptions } from '@/constants/selectOptions'
import {
  COMMUNITY_EDITOR_CONTENT,
  TEAM_RECRUITMENT_EDITOR_CONTENT,
} from '@/constants/tiptap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import { CreateCommunityRequest } from '@/types/api/Community.types'

import { Button, Link } from '@/components/common/button'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

export default function CreateCommunityPage(): JSX.Element {
  const methods = useForm<CreateCommunityRequest>({
    mode: 'onBlur',
    defaultValues: {
      communityTitle: '',
      communityContent: '',
      isComment: false,
    },
  })
  const { handleSubmit, control, watch } = methods
  const onSubmit = (data: CreateCommunityRequest) => {
    console.log(data)
  }
  const test = () => {
    console.log('------- 테스트 테스트 -------')
    console.log('communityTitle ' + watch('communityTitle'))
    console.log('communityContent ' + watch('communityContent'))
    console.log('communityCategory ' + watch('communityCategory'))
    console.log('isComment ' + watch('isComment'))
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-40'>
      <div className='flex flex-col gap-8'>
        <Text.Heading variant='heading2' as='h2' weight='700'>
          작성하기
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          궁금한 점을 작성하고 다른 개발자들과 소통해보세요
        </Text.Body>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='카테고리' />
          <Controller
            name='communityCategory'
            control={control}
            rules={{ required: '게시글 카테고리를 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={commuintyCategoryOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
                isMulti={false}
              >
                <Select.Trigger placeholder='카테고리 선택' />
                <Select.Menu>
                  {commuintyCategoryOptions.map(({ label, value }: Option) => (
                    <Select.Option key={value} label={label} value={value} />
                  ))}
                </Select.Menu>
              </Select>
            )}
          />
        </div>
        <Label required labelText='제목' className='mb-20'>
          <Form.Text
            name='communityTitle'
            required
            placeholder='궁금한 점을 작성해보세요!'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='communityContent'
            control={control}
            defaultValue={''}
            render={({ field: { onChange } }) => (
              <TipTapEditor
                content={COMMUNITY_EDITOR_CONTENT}
                onChange={onChange}
              />
            )}
          />
          <Text.Caption variant='caption1' color='gray500'>
            텍스트는 줄 바꿈은 엔터(Enter)를 통해 구분합니다.
          </Text.Caption>
        </div>
        <Label required labelText='답변 동의 여부' className='mb-40'>
          <Form.Checkbox
            variant='checkbox'
            name='isComment'
            label='다른 분들의 답변을 받아보시겠어요?'
            className='text-body2 font-medium'
          />
        </Label>
        <div className='flex justify-end gap-10'>
          <Link variant='outlined' href='/community'>
            취소
          </Link>
          <Button type='submit'>등록하기</Button>
          <Button onClick={test}>테스트</Button>
        </div>
      </Form>
    </Container>
  )
}
