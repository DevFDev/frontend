'use client'

import { Controller, useForm } from 'react-hook-form'

import {
  linkOptions,
  positionOptions,
  projectCategoryOptions,
  teamTypeOptions,
  techStackOptions,
} from '@/constants/selectOptions'
import {
  PROJECT_EDITOR_CONTENT,
  TEAM_RECRUITMENT_EDITOR_CONTENT,
} from '@/constants/tiptap'
import { LINK_ICON_MAP } from '@/constants/valueIconMap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  ProjectBase,
  ProjectCategory,
} from '@/types/api/Project.types'
import { CreateTeamRecruitmentRequest } from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { LinkSelect } from '@/components/link/LinkSelect'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

export default function CreateProjectPage(): JSX.Element {
  const methods = useForm<CreateProjectRequest>({
    mode: 'onBlur',
    defaultValues: {
      request: {
        projectTitle: '',
        projectContent: '',
        links: [{ type: undefined, url: undefined }],
        tags: [],
      },
    },
  })
  const { handleSubmit, control, watch, getValues } = methods
  const onSubmit = (data: CreateProjectRequest) => {
    console.log(data)
  }
  const values = watch()
  const test = () => {
    console.log('------- 테스트 테스트 -------')
    console.log('projectTitle ' + values.request.projectTitle)
    console.log('projectContent ' + values.request.projectContent)
    console.log('projectCategory ' + values.request.projectCategory)
    console.log('links ', values.request.links)
    console.log('tags ' + values.request.tags)
    console.dir(values.file)
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-40'>
      <div className='flex flex-col gap-8'>
        <Text.Heading variant='heading2' as='h2' weight='700'>
          프로젝트 공유
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          직접 만든 프로젝트와 개발 과정에서의 기술적 인사이트를 공유해보세요!
        </Text.Body>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label required labelText='제목' className='mb-20'>
          <Form.Text
            name='request.projectTitle'
            required
            placeholder='모두가 쉽게 이해할 수 있는 프로젝트 이름을 적어주세요!'
          />
        </Label>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='개발(프로젝트) 분야' />
          <Controller
            name='request.projectCategory'
            control={control}
            rules={{ required: '개발 분야를 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={projectCategoryOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
                isMulti={false}
              >
                <Select.Trigger placeholder='개발 분야 선택' />
                <Select.Menu>
                  {projectCategoryOptions.map(({ label, value }: Option) => (
                    <Select.Option key={value} value={value} label={label} />
                  ))}
                </Select.Menu>
              </Select>
            )}
          />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='링크' />
          <LinkSelect name={'request.links'} />
          {/* <Controller
            name='request.links'
            control={control}
            rules={{ required: '링크를 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={linkOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
              >
                <Select.Trigger
                  placeholder='링크 타입 선택'
                  startIcon={LINK_ICON_MAP?.[field.value]}
                />
                <Select.Menu>
                  {linkOptions.map(({ label, value }: Option) => (
                    <Select.Option
                      key={value}
                      value={value}
                      label={label}
                      startIcon={LINK_ICON_MAP[value]}
                    />
                  ))}
                </Select.Menu>
              </Select>
            )}
          /> */}
        </div>
        <Label required labelText='프로젝트 개요' className='mb-20'>
          <Form.TextArea
            name='teamRecruitmentNum'
            required
            placeholder='프로젝트 서비스에 대해 간단하게 작성해주세요!'
          />
        </Label>
        {/* <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='기술 스택' />
          <Controller
            name='request.techstacks'
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
                  <Select.Menu>
                    {techStackOptions.map(({ label, value }: Option) => (
                      <Select.Option key={value} value={value} label={label} />
                    ))}
                  </Select.Menu>
                  <Select.Menu>
                    {techStackOptions.map(({ label, value }: Option) => (
                      <Select.Option key={value} value={value} label={label} />
                    ))}
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
        </div> */}
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='request.projectContent'
            control={control}
            defaultValue={''}
            render={({ field: { onChange } }) => (
              <TipTapEditor
                content={PROJECT_EDITOR_CONTENT}
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
