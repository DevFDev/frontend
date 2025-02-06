import { Controller, useFormContext } from 'react-hook-form'

import { IcBin, IcChevronDown, IcChevronUp, IcPlus } from '@/assets/IconList'
import {
  educationGraduateStatusOptions,
  educationInstitutionNameOptions,
  educationLevelOptions,
  educationScaleOptions,
} from '@/constants/selectOptions'
import { cn } from '@/lib/utils'
import { PortfolioEducation } from '@/types/api/Portfolio.types'
import get from 'lodash/get'

import { CheckboxInput, TextInput } from '@/components/common/input'

import { DateSelect, Select } from '.'
import { Button } from '../../common/button'

interface EducationSelectProps {
  name: string
}

const EDUCATION_MAX_NUMBER = 5

export const EducationSelect = ({
  name,
}: EducationSelectProps): JSX.Element => {
  const { control, setValue, watch } = useFormContext()
  const values = watch()

  const currentEducations: PortfolioEducation[] = get(values, name, []) || []

  const handleFieldChange = (
    index: number,
    key: keyof PortfolioEducation,
    value: string | boolean
  ) => {
    const updatedEducations = [...currentEducations]
    updatedEducations[index] = { ...updatedEducations[index], [key]: value }
    setValue(name, updatedEducations)
  }

  const handleEducationDelete = (index: number): void => {
    const updatedEducations = currentEducations.filter(
      (_, i: number) => i !== index
    )
    setValue(name, updatedEducations)
  }

  const handleAddEducation = (): void => {
    if (currentEducations.length >= EDUCATION_MAX_NUMBER) return
    const updatedEducations = [
      ...currentEducations,
      {
        level: undefined,
        institutionName: '',
        major: '',
        admissionDate: '',
        graduationDate: '',
        graduationStatus: '재학중',
        isTransfer: false,
        grade: undefined,
        gradeScale: undefined,
      },
    ]
    setValue(name, updatedEducations)
  }

  const handleMoveEducation = (fromIndex: number, toIndex: number): void => {
    if (toIndex < 0 || toIndex >= currentEducations.length) return
    const updatedEducations = [...currentEducations]
    ;[updatedEducations[fromIndex], updatedEducations[toIndex]] = [
      updatedEducations[toIndex],
      updatedEducations[fromIndex],
    ]
    setValue(name, updatedEducations)
  }

  return (
    <div className='flex max-w-942 flex-col items-start gap-12'>
      <ul className='flex w-full flex-col gap-8'>
        {currentEducations.map((education, index) => (
          <Controller
            key={index}
            name={name}
            control={control}
            render={() => (
              <li className='flex w-full flex-col gap-4'>
                <div className='flex w-full items-center gap-8'>
                  <Select
                    options={educationLevelOptions}
                    selectedValue={education.level || ''}
                    onSingleChange={value => {
                      handleFieldChange(index, 'level', value)
                    }}
                  >
                    <Select.Trigger placeholder='학력 구분 선택' />
                    <Select.Menu>
                      {educationLevelOptions.map(({ label, value }: Option) => (
                        <Select.Option
                          key={value}
                          value={value}
                          label={label}
                        />
                      ))}
                    </Select.Menu>
                  </Select>
                  <Select
                    options={educationInstitutionNameOptions}
                    selectedValue={education.institutionName || ''}
                    onSingleChange={value => {
                      handleFieldChange(index, 'institutionName', value)
                    }}
                    isSearchable
                  >
                    <Select.Trigger placeholder='학교 선택' />
                    <Select.Menu>
                      <Select.Search placeholder='학교명을 입력해보세요' />
                      <Select.Options />
                    </Select.Menu>
                  </Select>
                  <CheckboxInput
                    label='편입'
                    variant='checkbox'
                    checked={education.isTransfer}
                    onChange={() => {
                      handleFieldChange(
                        index,
                        'isTransfer',
                        !education.isTransfer
                      )
                    }}
                  />
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
                      onClick={() => handleMoveEducation(index, index - 1)}
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
                      disabled={index === currentEducations.length - 1}
                      size='lg'
                      onClick={() => handleMoveEducation(index, index + 1)}
                    >
                      <IcChevronDown width={24} height={24} />
                    </Button>
                    <Button
                      variant='outlined'
                      borderColor='gray'
                      textColor='black'
                      className='w-48 rounded-l-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                      size='lg'
                      disabled={currentEducations.length <= 1}
                      onClick={() => handleEducationDelete(index)}
                    >
                      <IcBin width={24} height={24} />
                    </Button>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <TextInput
                    fullWidth={false}
                    className={'h-48 w-300'}
                    value={education.major}
                    onChange={e =>
                      handleFieldChange(index, 'major', e.target.value)
                    }
                    placeholder='전공'
                  />
                  <DateSelect
                    value={education.admissionDate}
                    onChange={date =>
                      handleFieldChange(index, 'admissionDate', date)
                    }
                    placeholder='입학년월'
                  />
                  <DateSelect
                    value={education.graduationDate}
                    onChange={date =>
                      handleFieldChange(index, 'graduationDate', date)
                    }
                    placeholder='졸업년월'
                  />
                  <Select
                    options={educationGraduateStatusOptions}
                    selectedValue={education.graduationStatus || ''}
                    onSingleChange={value => {
                      handleFieldChange(index, 'graduationStatus', value)
                    }}
                  >
                    <Select.Trigger placeholder='졸업여부 선택' />
                    <Select.Menu>
                      <Select.Options />
                    </Select.Menu>
                  </Select>
                </div>
                <div className='flex items-center gap-4'>
                  <TextInput
                    type='number'
                    fullWidth={false}
                    className={'h-48 w-146'}
                    onChange={e =>
                      handleFieldChange(index, 'grade', e.target.value)
                    }
                    placeholder='학점'
                  />
                  <Select
                    options={educationScaleOptions}
                    selectedValue={String(education.gradeScale) || ''}
                    onSingleChange={value => {
                      handleFieldChange(index, 'gradeScale', value)
                    }}
                  >
                    <Select.Trigger placeholder='기준 학점' className='w-146' />
                    <Select.Menu className='w-136'>
                      <Select.Options />
                    </Select.Menu>
                  </Select>
                </div>
              </li>
            )}
          />
        ))}
      </ul>
      <Button
        variant='text'
        className='h-24 p-0 text-gray-400'
        onClick={handleAddEducation}
      >
        <IcPlus />
        학력 추가
      </Button>
    </div>
  )
}
