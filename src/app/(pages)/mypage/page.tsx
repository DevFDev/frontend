'use client'

import { Controller, useForm } from 'react-hook-form'

import { IcProfile, IcProfileCard } from '@/assets/IconList'
import { positionOptions, techStackOptions } from '@/constants/selectOptions'

import { Button } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Divider } from '@/components/common/divider'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

export default function MyPage(): JSX.Element {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      techStacks: [],
      position: [],
    },
  })

  const { control } = methods

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data)
  }

  const affiliationOptions = [
    { label: '회사 ‧ 학교', value: 'COMPANY_SCHOOL' },
    { label: '프리랜서', value: 'FREELANCER' },
    { label: '기타', value: 'OTHER' },
  ]

  return (
    <div className='h-auto max-w-954'>
      <Text.Heading as='h2' variant='heading2' className='pb-8 pt-33'>
        프로필
      </Text.Heading>
      <Text.Body variant='body2' color='gray600' className='pb-20'>
        기본 정보 및 프로필을 설정할 수 있습니다.
      </Text.Body>

      <div className='w-954 rounded-12 bg-common-white p-40'>
        <div className='flex flex-row gap-x-20 pb-20'>
          <IcProfileCard width='40' height='40' />
          <div className='flex flex-col gap-y-4'>
            <Text.Title variant='title1' color='gray800'>
              프로필 완성률 0%
            </Text.Title>
            <Text.Body variant='body2' color='gray500'>
              타인에게 신뢰를 주는 중요한 첫걸음 입니다!
            </Text.Body>
          </div>
        </div>
        {/* 프로그레스 바 */}
        <div className='h-10 w-full rounded-20 bg-gray-200'></div>
      </div>

      <div className='mb-80 mt-40 flex h-full w-full flex-col rounded-12 bg-common-white p-40'>
        <Text.Heading
          as='h5'
          variant='heading5'
          color='gray800'
          className='pb-20'
        >
          내 정보
        </Text.Heading>

        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='mb-20 flex flex-row gap-x-60'>
            <Label labelText='프로필 사진' className='w-146' />
            <div className='flex gap-x-20'>
              <button>
                <IcProfile width='60' height='60' />
              </button>
              <Button variant='outlined'>프로필 변경</Button>
            </div>
          </div>
          <div className='mb-20 flex flex-row gap-x-60'>
            <Label labelText='이름' className='w-146' />
            <div className='w-500'>
              <Form.Text name='name' className='h-48' />
            </div>
          </div>

          <div className='mb-20 flex flex-row gap-x-60'>
            <Label labelText='비밀번호' className='w-146' />
            <Button variant='outlined'>비밀번호 수정</Button>
          </div>

          <div className='mb-20 flex flex-row gap-x-60'>
            <Label labelText='닉네임' className='w-146' />
            <div className='w-500'>
              <Form.Text name='nickname' className='h-48' />
            </div>
          </div>

          <div className='mb-20 flex flex-row gap-x-60'>
            <Label labelText='소개' className='w-146' />
            <div className='w-500'>
              <Form.TextArea size='sm' name='introduction' fullWidth />
            </div>
          </div>

          <div className='mb-20 flex flex-row items-center gap-x-60'>
            <Label labelText='GitHub' className='w-146' />
            <div className='flex w-500 flex-row items-center gap-x-8'>
              <Text.Body variant='body2' color='gray500'>
                https://github.com/
              </Text.Body>
              <Form.Text name='gitHub' placeholder='입력' />
            </div>
          </div>

          <Divider className='block' isVertical={false} />

          <Text.Heading
            as='h5'
            variant='heading5'
            color='gray800'
            className='py-20'
          >
            커리어
          </Text.Heading>

          <div className='mb-20 flex flex-row items-center gap-x-60'>
            <Label labelText='포지션' className='h-48 w-146' />
            <Controller
              name='position'
              control={control}
              rules={{ required: '기술 스택을 선택해주세요.' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    options={positionOptions}
                    selectedValues={field.value}
                    onMultiChange={field.onChange}
                    isMulti
                  >
                    <Select.Trigger placeholder='포지션 선택' />
                    <Select.Menu />
                  </Select>
                  <Text.Caption
                    variant='caption1'
                    color='gray500'
                    className='mt-4'
                  >
                    최대 3개까지 선택 가능합니다!
                  </Text.Caption>
                  <div className='flex gap-4'>
                    {field.value.map((stack: string) => (
                      <DeletableChip
                        key={stack}
                        label={stack}
                        onDelete={() => {
                          field.onChange(
                            field.value.filter((v: string) => v !== stack)
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

          <div className='mb-20 flex flex-row items-center gap-x-60'>
            <Label labelText='기술 스택' className='w-146' />
            <Controller
              name='techStacks'
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
                    최대 3개까지 선택 가능합니다!
                  </Text.Caption>
                  <div className='flex gap-4'>
                    {field.value.map((stack: string) => (
                      <DeletableChip
                        key={stack}
                        label={stack}
                        onDelete={() => {
                          field.onChange(
                            field.value.filter((v: string) => v !== stack)
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
          <div className='mb-40 flex gap-x-60'>
            <Label labelText='소속' className='w-146' />
            <div className='flex w-500 gap-x-40'>
              <Form.Radio
                name='affiliation'
                options={affiliationOptions}
                rules={{ required: '소속을 선택해주세요.' }}
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <Button size='lg' className='bg-semantic-negative'>
              회원 탈퇴
            </Button>
            <Button size='lg' disabled>
              프로필 저장
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
