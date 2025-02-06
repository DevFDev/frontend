import { Controller, useFormContext } from 'react-hook-form'

import { IcBin, IcChevronDown, IcChevronUp, IcPlus } from '@/assets/IconList'
import {
  careerLevelOptions,
  careerOtherOptions,
  careerPositionOptions,
  positionOptions,
} from '@/constants/selectOptions'
import { PORTFOLIO_CAREER_EDITOR_CONTENT } from '@/constants/tiptap'
import { TipTapEditor } from '@/lib/tiptap/TipTapEditor'
import { cn } from '@/lib/utils'
import { PortfolioCareer } from '@/types/api/Portfolio.types'
import get from 'lodash/get'

import { Button } from '@/components/common/button'
import { Grid } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { CheckboxInput, TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'

import { DateSelect, Select } from '.'

interface CareerSelectProps {
  name: string
}

const CAREER_MAX_NUMBER = 5

export const CareerSelect = ({ name }: CareerSelectProps): JSX.Element => {
  const { control, setValue, watch } = useFormContext()
  const values = watch()
  const currentCareers: PortfolioCareer[] = get(values, name, []) || []

  const handleFieldChange = (
    index: number,
    key: keyof PortfolioCareer,
    value: string | boolean
  ): void => {
    const updatedCareers = [...currentCareers]
    updatedCareers[index] = {
      ...updatedCareers[index],
      [key]: value,
    }
    setValue(name, updatedCareers)
  }

  const handleCareerDelete = (index: number): void => {
    const updatedCareers = currentCareers.filter((_, i) => i !== index)
    setValue(name, updatedCareers)
  }

  const handleAddCareer = (): void => {
    if (currentCareers.length >= CAREER_MAX_NUMBER) return
    const newCareer: PortfolioCareer = {
      companyName: '',
      position: '',
      level: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    }
    setValue(name, [...currentCareers, newCareer])
  }

  const handleMoveCareer = (fromIndex: number, toIndex: number): void => {
    if (toIndex < 0 || toIndex >= currentCareers.length) return
    const updatedCareers = [...currentCareers]
    ;[updatedCareers[fromIndex], updatedCareers[toIndex]] = [
      updatedCareers[toIndex],
      updatedCareers[fromIndex],
    ]
    setValue(name, updatedCareers)
  }

  return (
    <div className='flex flex-col items-start gap-12'>
      <ul className='flex w-full flex-col gap-20'>
        {currentCareers.map((career, index) => (
          <Controller
            key={index}
            name={name}
            control={control}
            render={() => (
              <li className='flex w-full flex-col gap-12'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-16 font-semibold'>경력 {index + 1}</h4>
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
                      onClick={() => handleMoveCareer(index, index - 1)}
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
                      disabled={index === currentCareers.length - 1}
                      size='lg'
                      onClick={() => handleMoveCareer(index, index + 1)}
                    >
                      <IcChevronDown width={24} height={24} />
                    </Button>
                    <Button
                      variant='outlined'
                      borderColor='gray'
                      textColor='black'
                      className='w-48 rounded-l-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                      size='lg'
                      disabled={currentCareers.length <= 1}
                      onClick={() => handleCareerDelete(index)}
                    >
                      <IcBin width={24} height={24} />
                    </Button>
                  </div>
                </div>
                <div className='flex flex-col gap-12'>
                  <div className='flex items-center gap-8'>
                    <TextInput
                      className='w-300'
                      fullWidth={false}
                      value={career.companyName}
                      onChange={e =>
                        handleFieldChange(index, 'companyName', e.target.value)
                      }
                      placeholder='회사명'
                    />
                    <DateSelect
                      value={career.startDate}
                      onChange={date =>
                        handleFieldChange(index, 'startDate', date)
                      }
                      placeholder='입사일'
                    />
                    <DateSelect
                      value={career.endDate}
                      onChange={date =>
                        handleFieldChange(index, 'endDate', date)
                      }
                      placeholder='퇴사일'
                    />
                    <CheckboxInput
                      variant='checkbox'
                      label='재직중'
                      checked={career.isCurrent}
                      onChange={e =>
                        handleFieldChange(index, 'isCurrent', e.target.checked)
                      }
                    />
                  </div>
                  <div className='flex items-center gap-8'>
                    <Select
                      options={positionOptions}
                      selectedValue={career.position}
                      onSingleChange={value => {
                        handleFieldChange(index, 'position', value)
                      }}
                    >
                      <Select.Trigger placeholder='직무 선택' />
                      <Select.Menu>
                        <Select.Options />
                      </Select.Menu>
                    </Select>
                    <Select
                      options={[
                        ...careerLevelOptions,
                        ...careerPositionOptions,
                        ...careerOtherOptions,
                      ]}
                      isRadio
                      selectedValue={career.level}
                      onSingleChange={value => {
                        handleFieldChange(index, 'level', value)
                      }}
                    >
                      <Select.Trigger placeholder='직급 선택' />
                      <Select.Menu className='h-504 w-648 gap-12 p-12'>
                        <div className='flex w-full flex-col gap-8'>
                          <Text.Title variant='title2' weight='700'>
                            직급(직위)
                          </Text.Title>
                          <Grid.Container
                            columns={4}
                            spacing={4}
                            className='w-full'
                          >
                            {careerLevelOptions.map(option => (
                              <Grid.Item key={option.value}>
                                <Select.Option
                                  label={option.label}
                                  value={option.value}
                                />
                              </Grid.Item>
                            ))}
                          </Grid.Container>
                        </div>
                        <Divider isVertical={false} />
                        <div className='flex w-466 flex-col gap-8'>
                          <Text.Title variant='title2' weight='700'>
                            직책
                          </Text.Title>
                          <Grid.Container
                            columns={3}
                            spacing={4}
                            className='w-full'
                          >
                            {careerPositionOptions.map(option => (
                              <Grid.Item key={option.value}>
                                <Select.Option
                                  label={option.label}
                                  value={option.value}
                                />
                              </Grid.Item>
                            ))}
                          </Grid.Container>
                        </div>
                        <Divider isVertical={false} />
                        <div className='flex w-466 flex-col gap-8'>
                          <Grid.Container
                            columns={3}
                            spacing={4}
                            className='w-full'
                          >
                            {careerOtherOptions.map(option => (
                              <Grid.Item key={option.value}>
                                <Select.Option
                                  label={option.label}
                                  value={option.value}
                                />
                              </Grid.Item>
                            ))}
                          </Grid.Container>
                        </div>
                      </Select.Menu>
                    </Select>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <span className='text-14 font-medium text-gray-600'>
                      업무 설명
                    </span>
                    <Controller
                      name={`${name}.${index}.description`}
                      defaultValue=''
                      render={({ field: { onChange: editorChange } }) => (
                        <TipTapEditor
                          content={PORTFOLIO_CAREER_EDITOR_CONTENT}
                          onChange={content =>
                            handleFieldChange(index, 'description', content)
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </li>
            )}
          />
        ))}
      </ul>
      <Button
        variant='text'
        className='h-24 p-0 text-gray-400'
        onClick={handleAddCareer}
      >
        <IcPlus />
        경력 추가
      </Button>
    </div>
  )
}
