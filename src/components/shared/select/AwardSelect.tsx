import { Controller, useFormContext } from 'react-hook-form'

import { IcBin, IcChevronDown, IcChevronUp, IcPlus } from '@/assets/IconList'
import { awardTypeOptions, languageOptions } from '@/constants/selectOptions'
import { cn } from '@/lib/utils'
import {
  ActivityAwardRequest,
  AwardType,
  CertificateAwardRequest,
  CompetitionAwardRequest,
  LanguageAwardRequest,
} from '@/types/api/Portfolio.types'
import get from 'lodash/get'

import { CheckboxInput, TextInput } from '@/components/common/input'

import { DateSelect, Select } from '.'
import { Button } from '../../common/button'

interface AwardSelectProps {
  name: string
}

const AWARD_MAX_NUMBER = 5

interface AwardFieldProps<T> {
  award: T
  index: number
  onChange: (index: number, key: keyof T, value: string) => void
}

const CompetitionAwardFields = ({
  award,
  index,
  onChange,
}: AwardFieldProps<CompetitionAwardRequest>) => {
  return (
    <>
      <TextInput
        value={award.competitionName}
        onChange={e => onChange(index, 'competitionName', e.target.value)}
        placeholder='수상 · 공모전명'
      />
      <TextInput
        value={award.hostingInstitution}
        onChange={e => onChange(index, 'hostingInstitution', e.target.value)}
        placeholder='수여 · 주최 기관'
      />
      <DateSelect
        value={award.competitionDate}
        onChange={date => onChange(index, 'competitionDate', date)}
        placeholder='수상 공모일'
      />
    </>
  )
}

const CertificateAwardFields = ({
  award,
  index,
  onChange,
}: AwardFieldProps<CertificateAwardRequest>) => {
  return (
    <>
      <TextInput
        value={award.certificateName}
        onChange={e => onChange(index, 'certificateName', e.target.value)}
        placeholder='자격증명'
      />
      <TextInput
        value={award.issuer}
        onChange={e => onChange(index, 'issuer', e.target.value)}
        placeholder='발행처 · 기관'
      />
      <DateSelect
        value={award.passingDate}
        onChange={date => onChange(index, 'passingDate', date)}
        placeholder='합격년월'
      />
    </>
  )
}

const LanguageAwardFields = ({
  award,
  index,
  onChange,
}: AwardFieldProps<LanguageAwardRequest>) => {
  return (
    <>
      <Select
        options={languageOptions}
        selectedValue={award.language}
        onSingleChange={value => onChange(index, 'language', value)}
      >
        <Select.Trigger placeholder='언어' />
        <Select.Menu>
          <Select.Options />
        </Select.Menu>
      </Select>
      <TextInput
        className='w-300'
        value={award.testName}
        onChange={e => onChange(index, 'testName', e.target.value)}
        placeholder='시험명'
      />
      <TextInput
        value={award.score}
        onChange={e => onChange(index, 'score', e.target.value)}
        placeholder='점수/급수'
      />
      <DateSelect
        value={award.obtainedDate}
        onChange={date => onChange(index, 'obtainedDate', date)}
        placeholder='취득일'
      />
    </>
  )
}

const ActivityAwardFields = ({
  award,
  index,
  onChange,
}: AwardFieldProps<ActivityAwardRequest>) => {
  return (
    <>
      <TextInput
        value={award.activityName}
        onChange={e => onChange(index, 'activityName', e.target.value)}
        placeholder='활동명'
      />
      <DateSelect
        value={award.startDate}
        onChange={date => onChange(index, 'startDate', date)}
        placeholder='시작일'
      />
      <DateSelect
        value={award.endDate}
        onChange={date => onChange(index, 'endDate', date)}
        placeholder='종료일'
      />
    </>
  )
}

export const AwardSelect = ({ name }: AwardSelectProps): JSX.Element => {
  const { control, setValue, watch } = useFormContext()
  const values = watch()

  const currentAwards = get(values, name, []) || []

  const handleFieldChange = (
    index: number,
    key: string,
    value: string
  ): void => {
    const updatedAwards = [...currentAwards]
    const currentAward = updatedAwards[index]

    if (key === 'awardType') {
      // 타입이 변경될 때는 새로운 객체로 초기화
      const baseAward = { awardType: value as AwardType }
      switch (value) {
        case 'COMPETITION':
          updatedAwards[index] = {
            ...baseAward,
            competitionName: '',
            hostingInstitution: '',
            competitionDate: '',
          } as CompetitionAwardRequest
          break
        case 'CERTIFICATE':
          updatedAwards[index] = {
            ...baseAward,
            certificateName: '',
            issuer: '',
            passingDate: '',
          } as CertificateAwardRequest
          break
        case 'LANGUAGE':
          updatedAwards[index] = {
            ...baseAward,
            language: '',
            testName: '',
            score: '',
            obtainedDate: '',
          } as LanguageAwardRequest
          break
        case 'ACTIVITY':
          updatedAwards[index] = {
            ...baseAward,
            activityName: '',
            startDate: '',
            endDate: '',
          } as ActivityAwardRequest
          break
      }
    } else {
      // 기존 award 객체를 유지하면서 특정 필드만 업데이트
      updatedAwards[index] = {
        ...currentAward,
        [key]: value,
      }
    }

    setValue(name, updatedAwards)
  }

  const handleAwardDelete = (index: number): void => {
    const updatedAwards = currentAwards.filter((_, i: number) => i !== index)
    setValue(name, updatedAwards)
  }

  const handleAddAward = (): void => {
    if (currentAwards.length >= AWARD_MAX_NUMBER) return
    const newAward: CertificateAwardRequest = {
      awardType: 'CERTIFICATE',
      certificateName: '',
      issuer: '',
      passingDate: '',
    }
    setValue(name, [...currentAwards, newAward])
  }

  const handleMoveAward = (fromIndex: number, toIndex: number): void => {
    if (toIndex < 0 || toIndex >= currentAwards.length) return
    const updatedAwards = [...currentAwards]
    ;[updatedAwards[fromIndex], updatedAwards[toIndex]] = [
      updatedAwards[toIndex],
      updatedAwards[fromIndex],
    ]
    setValue(name, updatedAwards)
  }

  const renderAwardFields = (
    award:
      | ActivityAwardRequest
      | CertificateAwardRequest
      | CompetitionAwardRequest
      | LanguageAwardRequest,
    index: number
  ) => {
    switch (award.awardType) {
      case 'COMPETITION':
        return (
          <CompetitionAwardFields
            award={award}
            index={index}
            onChange={handleFieldChange}
          />
        )
      case 'CERTIFICATE':
        return (
          <CertificateAwardFields
            award={award}
            index={index}
            onChange={handleFieldChange}
          />
        )
      case 'LANGUAGE':
        return (
          <LanguageAwardFields
            award={award}
            index={index}
            onChange={handleFieldChange}
          />
        )
      case 'ACTIVITY':
        return (
          <ActivityAwardFields
            award={award}
            index={index}
            onChange={handleFieldChange}
          />
        )
    }
  }

  return (
    <div className='flex flex-col items-start gap-12'>
      <ul className='flex w-full flex-col gap-8'>
        {currentAwards.map(
          (
            award:
              | ActivityAwardRequest
              | CertificateAwardRequest
              | CompetitionAwardRequest
              | LanguageAwardRequest,
            index: number
          ) => (
            <Controller
              key={index}
              name={name}
              control={control}
              render={() => (
                <li className='flex w-full flex-col gap-4'>
                  <div className='flex w-full items-center gap-8'>
                    <Select
                      options={awardTypeOptions}
                      selectedValue={award.awardType}
                      onSingleChange={value => {
                        handleFieldChange(index, 'awardType', value)
                      }}
                    >
                      <Select.Trigger placeholder='수상 유형 선택' />
                      <Select.Menu>
                        <Select.Options />
                      </Select.Menu>
                    </Select>
                    {renderAwardFields(award, index)}
                    <div className='ml-auto flex items-center'>
                      <Button
                        variant='outlined'
                        borderColor='gray'
                        textColor='black'
                        className={cn(
                          'w-48 rounded-r-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                        )}
                        disabled={index === 0}
                        size='lg'
                        onClick={() => handleMoveAward(index, index - 1)}
                      >
                        <IcChevronUp width={24} height={24} />
                      </Button>
                      <Button
                        variant='outlined'
                        borderColor='gray'
                        textColor='black'
                        className={cn(
                          'w-48 rounded-l-0 rounded-r-0 border-l-0 border-r-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                        )}
                        disabled={index === currentAwards.length - 1}
                        size='lg'
                        onClick={() => handleMoveAward(index, index + 1)}
                      >
                        <IcChevronDown width={24} height={24} />
                      </Button>
                      <Button
                        variant='outlined'
                        borderColor='gray'
                        textColor='black'
                        className='w-48 rounded-l-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                        size='lg'
                        disabled={currentAwards.length <= 1}
                        onClick={() => handleAwardDelete(index)}
                      >
                        <IcBin width={24} height={24} />
                      </Button>
                    </div>
                  </div>
                </li>
              )}
            />
          )
        )}
      </ul>
      <Button
        variant='text'
        className='h-24 p-0 text-gray-400'
        onClick={handleAddAward}
      >
        <IcPlus />
        수상 내역 추가
      </Button>
    </div>
  )
}
