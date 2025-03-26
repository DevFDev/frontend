'use client'

import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
import { ApiResponse } from '@/types/api/ApiResponse.types'

import { authProxy } from '@/app/api/auth/authProxy'
import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const updateProfile = async (
    data: CreatePortfolioRequest,
    profileImage?: File
  ): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }))

    if (profileImage) {
      formData.append('profileImage', profileImage)
    }

    return await authProxy
      .post('v1/portfolio', {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .json()
  }

  const onSubmit = async (data: CreatePortfolioRequest) => {
    setIsLoading(true)
    try {
      const file = data.file instanceof FileList ? data.file[0] : undefined
      const response = await updateProfile(data, file)
      
      if (response.isSuccess) {
        router.push('/portfolio')
      } else {
        alert(response.message || '포트폴리오 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('포트폴리오 등록 중 오류 발생:', error)
      alert('포트폴리오 등록 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
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
          <Label required labelText='수상 및 기타' />
          <AwardSelect name='request.awards' />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='경력' />
          <CareerSelect name='request.careers' />
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
        <div className='flex justify-end gap-10'>
          <Link variant='outlined' href='/team'>
            취소
          </Link>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </Form>
    </Container>
  )
}
