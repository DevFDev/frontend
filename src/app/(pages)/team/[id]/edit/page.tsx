'use client'

import { useParams } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'

import {
  positionOptions,
  teamTypeOptions,
  techStackOptions,
} from '@/constants/selectOptions'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import {
  GetTeamRecruitmentResponse,
  UpdateTeamRecruitmentRequest,
} from '@/types/api/Team.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

import { useTeamRecruitment, useUpdateTeamRecruitment } from '@/queries/team'

const MIN_RECRUIT_NUMBER = 1
const MAX_RECRUIT_NUMBER = 10

const createTeamSchema = z.object({
  teamTitle: z.string().nonempty('제목을 입력해주세요.'),
  teamContent: z.string().nonempty('내용을 입력해주세요.'),
  teamType: z.enum(['STUDY', 'PROJECT', 'MENTORING'], {
    errorMap: () => ({ message: '모집 유형을 선택해주세요.' }),
  }),
  teamRecruitmentNum: z
    .string()
    .min(1, '모집 인원을 입력해주세요.')
    .regex(/^\d+$/, '숫자를 입력해주세요.')
    .transform(Number)
    .refine(val => val >= MIN_RECRUIT_NUMBER, {
      message: `최소 ${MIN_RECRUIT_NUMBER}명 이상 모집해야 합니다.`,
    })
    .refine(val => val <= MAX_RECRUIT_NUMBER, {
      message: `최대 ${MAX_RECRUIT_NUMBER}명까지 모집 가능합니다.`,
    }),
  teamPosition: z.string().min(1, '포지션을 선택해주세요.'),
  teamTechStack: z
    .array(z.string())
    .max(5, '기술 스택은 최대 5개까지 선택 가능합니다.')
    .optional(),
  teamTags: z
    .array(z.string())
    .max(10, '태그는 최대 10개까지 입력할 수 있습니다.')
    .optional(),
})

export default function UpdateTeamPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const teamId = Number(params.id)

  const { data: teamDetail, isLoading, isError } = useTeamRecruitment(teamId)
  const {
    teamTitle,
    teamContent,
    teamPosition,
    teamTechStack,
    teamTags,
    teamRecruitmentNum,
    teamType,
  } = (teamDetail as GetTeamRecruitmentResponse) ?? {
    teamTitle: '',
    teamContent: '',
    teamPosition: '',
    teamTechStack: [],
    teamTags: [],
  }

  const { mutate } = useUpdateTeamRecruitment(teamId)

  const methods = useForm<UpdateTeamRecruitmentRequest>({
    mode: 'onBlur',
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      teamTitle,
      teamContent,
      teamPosition,
      teamTechStack,
      teamTags,
      teamRecruitmentNum,
      teamType,
    },
  })

  const { handleSubmit, control } = methods
  const onSubmit = (data: UpdateTeamRecruitmentRequest) => {
    mutate(data)
  }

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

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
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  options={teamTypeOptions}
                  selectedValue={field.value || ''}
                  onSingleChange={field.onChange}
                  isMulti={false}
                >
                  <Select.Trigger placeholder='모집 유형 선택' />
                  <Select.Menu>
                    <Select.Options />
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
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  options={positionOptions}
                  selectedValue={field.value || ''}
                  onSingleChange={field.onChange}
                >
                  <Select.Trigger placeholder='포지션 선택' />
                  <Select.Menu>
                    <Select.Options />
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

        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='teamContent'
            control={control}
            defaultValue={teamContent}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div>
                <TipTapEditor content={teamContent} onChange={onChange} />
                {error?.message && (
                  <Form.Message hasError={!!error}>
                    {error.message}
                  </Form.Message>
                )}
              </div>
            )}
          />
          <Text.Caption variant='caption1' color='gray500'>
            텍스트 줄 바꿈은 엔터(Enter)를 통해 구분합니다.
          </Text.Caption>
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label labelText='기술 스택' />
          <Controller
            name='teamTechStack'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  options={techStackOptions}
                  selectedValues={field.value}
                  onMultiChange={field.onChange}
                  isMulti
                >
                  <Select.Trigger placeholder='기술 스택 선택' />
                  <Select.Menu>
                    <Select.Search placeholder='스택을 입력해보세요!' />
                    <Select.Options />
                  </Select.Menu>
                </Select>
                <Text.Caption
                  variant='caption1'
                  color='gray500'
                  className='mt-4'
                >
                  최대 5개까지 선택 가능합니다.
                </Text.Caption>
                <div className='flex gap-4'>
                  {(field.value ?? []).map(stack => (
                    <DeletableChip
                      key={stack}
                      label={stack}
                      onDelete={() => {
                        field.onChange(
                          (field.value ?? []).filter(v => v !== stack)
                        )
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
        <Label labelText='태그' className='mb-40'>
          <Form.TagInput
            name='teamTags'
            placeholder='태그를 입력하고 엔터를 눌러주세요. 태그 최대 개수는 10개입니다.'
          />
        </Label>
        <div className='flex justify-end gap-10'>
          <Link variant='outlined' href={`/team/${teamId}`}>
            취소
          </Link>
          <Button type='submit'>수정하기</Button>
        </div>
      </Form>
    </Container>
  )
}
