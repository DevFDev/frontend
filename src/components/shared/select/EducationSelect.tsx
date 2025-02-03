import { Controller, useFormContext } from 'react-hook-form'

import { IcBin, IcChevronDown, IcChevronUp, IcPlus } from '@/assets/IconList'
import { educationLevelOptions } from '@/constants/selectOptions'
import { cn } from '@/lib/utils'
import { PortfolioEducation } from '@/types/api/Portfolio.types'
import get from 'lodash/get'

import { TextInput } from '@/components/common/input'

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

  const currentEducations: PortfolioEducation[] =
    get(values, name, [
      { type: undefined, schoolName: '', major: '', status: '편입' },
    ]) || []

  const handleFieldChange = (
    index: number,
    key: keyof PortfolioEducation,
    value: string
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
      { type: undefined, schoolName: '', major: '', status: '편입' },
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
    <div className='flex max-w-1000 flex-col items-start gap-12'>
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
                  <TextInput
                    className={'w-300'}
                    value={education.institutionName}
                    onChange={e =>
                      handleFieldChange(
                        index,
                        'institutionName',
                        e.target.value
                      )
                    }
                    placeholder='학교명'
                    fullWidth
                  />

                  <div className='flex items-center'>
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
                    className={'w-300'}
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
                    options={[
                      { label: '졸업', value: '졸업' },
                      { label: '재학중', value: '재학중' },
                      { label: '휴학중', value: '휴학중' },
                      { label: '중퇴', value: '중퇴' },
                      { label: '수료', value: '수료' },
                    ]}
                    selectedValue={education.graduationStatus || ''}
                    onSingleChange={value => {
                      handleFieldChange(index, 'graduationStatus', value)
                    }}
                  >
                    <Select.Trigger placeholder='졸업여부 선택' />
                    <Select.Menu>
                      {[
                        { label: '졸업', value: '졸업' },
                        { label: '재학중', value: '재학중' },
                        { label: '휴학중', value: '휴학중' },
                        { label: '중퇴', value: '중퇴' },
                        { label: '수료', value: '수료' },
                      ].map(({ label, value }) => (
                        <Select.Option
                          key={value}
                          value={value}
                          label={label}
                        />
                      ))}
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
