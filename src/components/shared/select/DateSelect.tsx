import { useState } from 'react'

import { IcCalendar, IcChevronLeft, IcChevronRight } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Button } from '@/components/common/button'
import { Box } from '@/components/common/containers'
import { Dropdown } from '@/components/common/dropdown'

interface DateSelectProps {
  value?: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
}

export const DateSelect = ({
  value,
  onChange,
  placeholder = '날짜 선택',
  className,
}: DateSelectProps): JSX.Element => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(
    value ? parseInt(value.split('년')[0]) : currentYear
  )

  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (selectedYear >= currentYear && direction === 'next') return
    setSelectedYear(prev => (direction === 'prev' ? prev - 1 : prev + 1))
  }

  const handleMonthSelect = (month: number) => {
    const formattedMonth = month.toString().padStart(2, '0')
    onChange(`${selectedYear}년 ${formattedMonth}월`)
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Box
          className={cn(
            'h-48 w-210 flex-row justify-between p-12 text-body1 font-medium text-gray-500 focus:border-primary-normal',
            className
          )}
          rounded={8}
        >
          <div className='flex items-center gap-4'>
            <IcCalendar width={24} height={24} />
            <span className={cn('text-gray-500', { 'text-gray-800': value })}>
              {value || placeholder}
            </span>
          </div>
        </Box>
      </Dropdown.Trigger>
      <Dropdown.Menu className='flex flex-col items-center justify-between gap-8 p-12'>
        <div className='border-b flex w-full items-center justify-between border-solid border-gray-200'>
          <Button
            variant='text'
            onClick={() => handleYearChange('prev')}
            className='h-auto p-0'
          >
            <IcChevronLeft width={24} height={24} />
          </Button>
          <span className='text-body2 font-medium'>{selectedYear}</span>
          <Button
            variant='text'
            onClick={() => handleYearChange('next')}
            disabled={selectedYear >= currentYear}
            className='h-auto p-0'
          >
            <IcChevronRight width={24} height={24} />
          </Button>
        </div>
        <div className='row-gap-4 grid w-full grid-cols-3 gap-8'>
          {months.map(month => (
            <Dropdown.Item
              key={month}
              onClick={() => handleMonthSelect(month)}
              className={cn(
                'flex h-36 w-full items-center justify-center rounded-8 text-body3 text-gray-800',
                value ===
                  `${selectedYear}년 ${month.toString().padStart(2, '0')}월`
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-100'
              )}
            >
              {month}월
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
