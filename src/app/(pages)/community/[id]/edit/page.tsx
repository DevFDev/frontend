'use client'

import { useParams } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'

import { commuintyCategoryOptions } from '@/constants/selectOptions'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import {
  CreateCommunityRequest,
  GetCommunityDetailResponse,
  UpdateCommunityRequest,
} from '@/types/api/Community.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Link } from '@/components/common/button'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

import {
  useCommunity,
  useCreateCommunity,
  useUpdateCommunity,
} from '@/queries/community'

const createCommunitySchema = z.object({
  communityTitle: z.string().nonempty('제목을 입력해주세요.'),
  communityContent: z.string().nonempty('내용을 입력해주세요.'),
  communityCategory: z.enum(['SKILL', 'CAREER', 'OTHER'], {
    errorMap: () => ({ message: '질문 유형을 선택해주세요.' }),
  }),
  isComment: z.boolean().optional(),
})

export default function UpdateCommunityPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const communityId = Number(params.id)

  const {
    data: communityDetail,
    isLoading,
    isError,
  } = useCommunity(communityId)

  const { communityTitle, communityContent, communityCategory, isComment } =
    (communityDetail as GetCommunityDetailResponse) ?? {
      communityTitle: '',
      communityContent: '',
      isComment: false,
    }

  const { mutate } = useUpdateCommunity(communityId)

  const methods = useForm<CreateCommunityRequest>({
    mode: 'onBlur',
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      communityTitle,
      communityContent,
      isComment,
      communityCategory,
    },
  })
  const { handleSubmit, control } = methods
  const onSubmit = (data: UpdateCommunityRequest) => {
    mutate(data)
  }

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

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
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  options={commuintyCategoryOptions}
                  selectedValue={field.value || ''}
                  onSingleChange={field.onChange}
                  isMulti={false}
                >
                  <Select.Trigger placeholder='카테고리 선택' />
                  <Select.Menu>
                    {commuintyCategoryOptions.map(
                      ({ label, value }: Option) => (
                        <Select.Option
                          key={value}
                          label={label}
                          value={value}
                        />
                      )
                    )}
                  </Select.Menu>
                </Select>
                {error?.message && (
                  <Form.Message hasError={!!error}>
                    {error.message}
                  </Form.Message>
                )}
              </div>
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
            defaultValue={communityContent}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div>
                <TipTapEditor content={communityContent} onChange={onChange} />
                {error?.message && (
                  <Form.Message hasError={!!error}>
                    {error.message}
                  </Form.Message>
                )}
              </div>
            )}
          />
          <Text.Caption variant='caption1' color='gray500'>
            텍스트는 줄 바꿈은 엔터(Enter)를 통해 구분합니다.
          </Text.Caption>
        </div>
        <Label labelText='답변 동의 여부' className='mb-40'>
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
          <Button type='submit'>수정하기</Button>
        </div>
      </Form>
    </Container>
  )
}
