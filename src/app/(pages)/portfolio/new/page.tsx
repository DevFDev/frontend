'use client'

import { Controller, useForm } from 'react-hook-form'

import { positionOptions, techStackOptions } from '@/constants/selectOptions'
import {
  PORTFOLIO_EDITOR_CONTENT,
  TEAM_RECRUITMENT_EDITOR_CONTENT,
} from '@/constants/tiptap'
import { LINK_ICON_MAP } from '@/constants/valueIconMap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import {
  CreatePortfolioRequest,
  PortfolioDetail,
} from '@/types/api/Portfolio.types'
import { CreateTeamRecruitmentRequest } from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import {
  EducationSelect,
  LinkSelect,
  PositionSelect,
  TechStackSelect,
} from '@/components/shared/select'

export default function CreatePortfolioPage(): JSX.Element {
  const methods = useForm<CreatePortfolioRequest>({
    mode: 'onBlur',
    defaultValues: {
      request: {
        portTitle: '',
        portContent: '',
        techStacks: [],
        educations: [],
        awards: [],
        careers: [],
        links: [{ type: undefined, url: undefined }],
        tags: [],
      },
    },
  })
  const { handleSubmit, control, watch } = methods
  const onSubmit = (data: CreatePortfolioRequest) => {
    console.log(data)
  }
  const values = watch()

  const test = () => {
    console.log('------- 테스트 테스트 -------')
    console.log('portTitle ' + values.request.portTitle)
    console.log('portContent ' + values.request.portContent)
    console.log('portPosition ' + values.request.portPosition)
    console.log('techStacks ' + values.request.techStacks)
    console.log('educations ' + values.request.educations)
    console.log('awards ' + values.request.awards)
    console.log('careers ' + values.request.careers)
    console.log('links ', values.request.links)
    console.log('tags ' + values.request.tags)
    console.dir(values.file)
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
          <Label required labelText='링크' />
          <LinkSelect name={'request.links'} />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='기술 스택' />
          <TechStackSelect name='request.techStacks' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='학력' />
          <EducationSelect name='request.educations' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='request.portContent'
            control={control}
            defaultValue={''}
            render={({ field: { onChange } }) => (
              <TipTapEditor
                content={PORTFOLIO_EDITOR_CONTENT}
                onChange={onChange}
              />
            )}
          />
          <Text.Caption variant='caption1' color='gray500'>
            텍스트는 줄 바꿈은 엔터(Enter)를 통해 구분합니다.
          </Text.Caption>
        </div>
        <Label labelText='태그' className='mb-20'>
          <Form.TagInput
            name='request.tags'
            placeholder='태그를 입력하고 엔터를 눌러주세요. 태그 최대 개수는 10개입니다.'
          />
        </Label>
        <div className='mb-40 flex flex-col gap-8'>
          <Label labelText='대표 이미지 등록' />
          <Form.File name='file' />
          <Text.Caption variant='caption1' color='gray500'>
            포트폴리오 리스트에 보여지는 썸네일입니다. 미등록 시 기본썸네일로
            적용 됩니다.
            <br />
            760*480 이상 / jpeg, jpg, png 형식을 권장합니다.
          </Text.Caption>
        </div>
        <div className='flex justify-end gap-10'>
          <Link variant='outlined' href='/team'>
            취소
          </Link>
          <Button type='submit'>등록하기</Button>
          <Button onClick={test}>테스트</Button>
        </div>
        <div className='w-full'></div>
      </Form>
    </Container>
  )
}
