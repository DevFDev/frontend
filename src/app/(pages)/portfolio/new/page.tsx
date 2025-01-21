'use client'

import { Controller, useForm } from 'react-hook-form'

import {
  IcFacebook,
  IcGithub,
  IcInsta,
  IcLink,
  IcNotion,
} from '@/assets/IconList'
import {
  portfolioLinkOptions,
  positionOptions,
  teamTypeOptions,
  techStackOptions,
} from '@/constants/selectOptions'
import {
  PORTFOLIO_EDITOR_CONTENT,
  TEAM_RECRUITMENT_EDITOR_CONTENT,
} from '@/constants/tiptap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import { CreateTeamRecruitmentRequest } from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Label } from '@/components/common/label'
import { Text } from '@/components/common/text'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'

export default function CreatePortfolioPage(): JSX.Element {
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
          작성하기
        </Text.Heading>
        <Text.Body variant='body2' color='gray600'>
          자신의 포트폴리오를 자유롭게 나타내보세요.
        </Text.Body>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label required labelText='제목' className='mb-20'>
          <Form.Text
            name='teamTitle'
            required
            placeholder='끊임없이 발전하는 개발자 홍길동'
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
                <Select.Menu>
                  {positionOptions.map(({ label, value }: Option) => (
                    <Select.Option key={value} label={label} value={value} />
                  ))}
                </Select.Menu>
              </Select>
            )}
          />
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='링크' />
          <Controller
            name='teamPosition'
            control={control}
            rules={{ required: '링크를 선택해주세요.' }}
            render={({ field }) => (
              <Select
                options={portfolioLinkOptions}
                selectedValue={field.value || ''}
                onSingleChange={field.onChange}
              >
                <Select.Trigger placeholder='링크 타입 선택' />
                <Select.Menu>
                  {portfolioLinkOptions.map(({ label, value }: Option) => (
                    <Select.Option
                      key={value}
                      value={value}
                      label={label}
                      startIcon={PORTFOLIO_LINK_MAP[value]}
                    />
                  ))}
                </Select.Menu>
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
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Label required labelText='내용' />
          <Controller
            name='teamContent'
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

const PORTFOLIO_LINK_MAP: Record<string, React.ReactElement> = {
  LINK: <IcLink width={24} height={24} />,
  FACEBOOK: <IcFacebook width={24} height={24} />,
  INSTAGRAM: <IcInsta width={24} height={24} />,
  GITHUB: <IcGithub width={24} height={24} />,
  NOTION: <IcNotion width={24} height={24} />,
}
