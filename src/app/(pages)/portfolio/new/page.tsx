'use client'

import { Controller, useForm } from 'react-hook-form'

import { PORTFOLIO_EDITOR_CONTENT } from '@/constants/tiptap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import { CreatePortfolioRequest } from '@/types/api/Portfolio.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Link } from '@/components/common/button'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import {
  AwardSelect,
  CareerSelect,
  EducationSelect,
  LinkSelect,
  PositionSelect,
  TechStackSelect,
} from '@/components/shared/select'

import { useCreatePortfolio } from '@/queries/portfolio'

const createPortfolioSchema = z.object({
  request: z.object({
    portTitle: z.string().nonempty('제목을 입력해주세요.'),
    portContent: z.string().nonempty('내용을 입력해주세요.'),
    portPosition: z.string().nonempty('포지션을 입력해주세요.'),
    techStacks: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.'),
    tags: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
      .optional(),
    links: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
      .optional(),
    educations: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
      .optional(),
    awards: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
      .optional(),
    careers: z
      .array(z.string())
      .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
      .optional(),
  }),
})

export default function CreatePortfolioPage(): JSX.Element {
  const { mutate } = useCreatePortfolio()

  const methods = useForm<CreatePortfolioRequest>({
    mode: 'onBlur',
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      request: {
        portTitle: '',
        portContent: '',
        techStacks: [],
        educations: [],
        awards: [],
        careers: [],
        links: [],
        tags: [],
      },
    },
  })

  const { handleSubmit, control } = methods

  const onSubmit = (data: CreatePortfolioRequest) => {
    const formdata = new FormData()

    mutate(data)
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-40'>
      <div className='flex flex-col gap-8'>
        <Text.Heading variant='heading2' as='h2' weight='700'>
          작성하기
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          자신의 포트폴리오를 자유롭게 나타내보세요.
        </Text.Body>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label required labelText='제목' className='mb-20'>
          <Form.Text
            name='request.portTitle'
            required
            placeholder='나를 표현할 수 있는 제목을 작성해주세요.'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='포지션' />
          <PositionSelect name='request.portPosition' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='기술 스택' />
          <TechStackSelect name='request.techStacks' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='request.portContent'
            control={control}
            defaultValue={''}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div>
                <TipTapEditor
                  content={PORTFOLIO_EDITOR_CONTENT}
                  onChange={onChange}
                />
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
        <Label required labelText='태그' className='mb-20'>
          <Form.TagInput
            name='request.tags'
            placeholder='태그를 입력하고 엔터를 눌러주세요. 태그 최대 개수는 10개입니다.'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label labelText='링크' />
          <LinkSelect name={'request.links'} />
        </div>

        <div className='mb-20 flex flex-col gap-4'>
          <Label labelText='학력' />
          <EducationSelect name='request.educations' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label labelText='수상 및 기타' />
          <AwardSelect name='request.awards' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label labelText='경력' />
          <CareerSelect name='request.careers' />
        </div>
        <div className='flex justify-end gap-10'>
          <Link variant='outlined' href='/team'>
            취소
          </Link>
          <Button type='submit'>등록하기</Button>
        </div>
      </Form>
    </Container>
  )
}
