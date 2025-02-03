import { Controller, useFormContext } from 'react-hook-form'

import { IcBin, IcChevronDown, IcChevronUp, IcPlus } from '@/assets/IconList'
import { linkOptions } from '@/constants/selectOptions'
import { LINK_ICON_MAP } from '@/constants/valueIconMap'
import { cn } from '@/lib/utils'
import { PostLink } from '@/types/api/Post.types'
import get from 'lodash/get'

import { TextInput } from '@/components/common/input'

import { Select } from '.'
import { Button } from '../../common/button'

interface SelectLinkProps {
  name: string
}

const LINK_MAX_NUMBER = 5
const DEFAULT_URL_PLACEHOLDER = 'https://'

export const LinkSelect = ({ name }: SelectLinkProps): JSX.Element => {
  const { control, setValue, watch } = useFormContext()
  const values = watch()

  const currentLinks: PostLink[] =
    get(values, name, [{ type: undefined, url: undefined }]) || []

  const handleFieldChange = (
    index: number,
    key: keyof PostLink,
    value: string
  ) => {
    const updatedLinks = [...currentLinks]
    updatedLinks[index] = { ...updatedLinks[index], [key]: value }
    setValue(name, updatedLinks)
  }

  const handleLinkDelete = (index: number): void => {
    const updatedLinks = currentLinks.filter((_, i: number) => i !== index)
    setValue(name, updatedLinks)
  }

  const handleAddLink = (): void => {
    if (currentLinks.length >= LINK_MAX_NUMBER) return
    const updatedLinks = [...currentLinks, { type: undefined, url: undefined }]
    setValue(name, updatedLinks)
  }

  const handleMoveLink = (fromIndex: number, toIndex: number): void => {
    if (toIndex < 0 || toIndex >= currentLinks.length) return
    const updatedLinks = [...currentLinks]

    ;[updatedLinks[fromIndex], updatedLinks[toIndex]] = [
      updatedLinks[toIndex],
      updatedLinks[fromIndex],
    ]
    setValue(name, updatedLinks)
  }

  return (
    <div className='flex flex-col items-start gap-12'>
      <ul className='flex w-full flex-col gap-8'>
        {currentLinks.map((currentLink, index) => (
          <Controller
            key={index}
            name={name}
            control={control}
            render={({ field }) => (
              <li className='flex w-full items-center justify-between gap-8'>
                <Select
                  options={linkOptions}
                  selectedValue={currentLink.type || ''}
                  onSingleChange={value => {
                    handleFieldChange(index, 'type', value)
                  }}
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
                <TextInput
                  value={currentLink.url || DEFAULT_URL_PLACEHOLDER}
                  onChange={e =>
                    handleFieldChange(index, 'url', e.target.value)
                  }
                  placeholder={DEFAULT_URL_PLACEHOLDER}
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
                    onClick={() => {
                      handleMoveLink(index, index - 1)
                    }}
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
                    disabled={index === currentLinks.length - 1}
                    size='lg'
                    onClick={() => {
                      handleMoveLink(index, index + 1)
                    }}
                  >
                    <IcChevronDown width={24} height={24} />
                  </Button>
                  <Button
                    variant='outlined'
                    borderColor='gray'
                    textColor='black'
                    className='w-48 rounded-l-0 px-12 aria-disabled:border-1 aria-disabled:border-gray-200 aria-disabled:bg-common-white aria-disabled:text-gray-400'
                    size='lg'
                    disabled={currentLinks.length <= 1}
                    onClick={() => handleLinkDelete(index)}
                  >
                    <IcBin width={24} height={24} />
                  </Button>
                </div>
              </li>
            )}
          />
        ))}
      </ul>
      <Button
        variant='text'
        className='h-24 p-0 text-gray-400'
        onClick={handleAddLink}
      >
        <IcPlus />
        링크 추가
      </Button>
    </div>
  )
}
