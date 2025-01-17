'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { IcPencil, IcSearch } from '@/assets/IconList'
import {
  positionOptions,
  teamTypeOptions,
  techStackOptions,
} from '@/constants/selectOptions'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import { cn } from '@/lib/utils'
import {
  CreateTeamRecruitmentRequest,
  TeamRecruitmentListItem,
  TeamType,
} from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container, Grid } from '@/components/common/containers'
import { TagInput, TextInput } from '@/components/common/input'
import { Label } from '@/components/common/label'
import { Switch } from '@/components/common/switch/Switch'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'
import { TeamRecruitmentCard } from '@/components/team/TeamRecruitmentCard'

import { usePagination } from '@/hooks/usePagination'
import { useToggle } from '@/hooks/useToggle'

export default function CreateTeamPage(): JSX.Element {
  const methods = useForm<CreateTeamRecruitmentRequest>({
    mode: 'onBlur',
    defaultValues: {
      teamTitle: '',
      teamContent: '',
      teamPosition: '',
      teamTechStack: [],
      teamTags: [],
    },
  })
  const { handleSubmit, control, watch } = methods
  const onSubmit = (data: CreateTeamRecruitmentRequest) => {
    console.log(data)
  }
  const test = () => {
    console.log('------- 테스트 테스트 -------')
    console.log('teamTitle ' + watch('teamTitle'))
    console.log('teamContent ' + watch('teamContent'))
    console.log('teamType ' + watch('teamType'))
    console.log('teamPosition ' + watch('teamPosition'))
    console.log('teamRecruitmentNum ' + watch('teamRecruitmentNum'))
    console.log('teamTechStack ' + watch('teamTechStack'))
    console.log('teamTags ' + watch('teamTags'))
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-40'>
      <div className='flex flex-col gap-8'>
        <Text.Heading variant='heading2' as='h2' weight='700'>
          팀원 찾기
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          함께 성장할 팀원을 찾아보세요!
        </Text.Body>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label required labelText='제목' className='mb-20'>
          <Form.Text
            name='teamTitle'
            required
            placeholder='예시)함께 성장할 개발 스터디 팀원을 모집합니다!'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='모집 유형' />
          <Controller
            name='teamType'
            control={control}
            rules={{ required: '모집 유형을 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={teamTypeOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
                isMulti={false}
              >
                <Select.Trigger placeholder='모집 유형 선택' />
                <Select.Menu />
              </Select>
            )}
          />
        </div>
        <Label required labelText='모집 인원' className='mb-20'>
          <Form.Text
            type='number'
            name='teamRecruitmentNum'
            required
            placeholder='모집 인원을 입력해주세요'
            className='w-210'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='포지션' />
          <Controller
            name='teamPosition'
            control={control}
            rules={{ required: '모집 유형을 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={positionOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
              >
                <Select.Trigger placeholder='포지션 선택' />
                <Select.Menu />
              </Select>
            )}
          />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='기술 스택' />
          <Controller
            name='teamTechStack'
            control={control}
            rules={{ required: '기술 스택을 선택해주세요.' }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  options={techStackOptions}
                  selectedValues={field.value}
                  onMultiChange={field.onChange}
                  isMulti
                >
                  <Select.Trigger placeholder='기술 스택 선택' />
                  <Select.Menu />
                </Select>
                <Text.Caption
                  variant='caption1'
                  color='gray500'
                  className='mt-4'
                >
                  최대 5개까지 선택 가능합니다.
                </Text.Caption>
                <div className='flex gap-4'>
                  {field.value.map(stack => (
                    <DeletableChip
                      key={stack}
                      label={stack}
                      onDelete={() => {
                        field.onChange(field.value.filter(v => v !== stack))
                      }}
                    />
                  ))}
                </div>
                {error?.message && (
                  <Form.Message hasError={!!error}>
                    {error.message}
                  </Form.Message>
                )}
              </div>
            )}
          />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='teamContent'
            control={control}
            defaultValue={''}
            render={({ field: { onChange } }) => (
              <TipTapEditor content='<h2>하이 용빈</h2>' onChange={onChange} />
            )}
          />
          <Text.Caption variant='caption1' color='gray500'>
            텍스트는 줄 바꿈은 엔터(Enter)를 통해 구분합니다.
          </Text.Caption>
        </div>
        <Label required labelText='태그' className='mb-40'>
          <Form.TagInput
            name='teamTags'
            placeholder='태그를 입력하고 엔터를 눌러주세요. 태그 최대 개수는 10개입니다.'
          />
        </Label>
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
