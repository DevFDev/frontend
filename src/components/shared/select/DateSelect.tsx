import { useState } from 'react'

import { IcCalendar } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Select } from './Select'

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
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)

  // 년도 옵션 생성 (현재 년도 기준 +-10년)
  const yearOptions = Array.from({ length: 21 }, (_, i) => ({
    label: `${currentYear - 10 + i}년`,
    value: `${currentYear - 10 + i}`,
  }))

  // 월 옵션 생성
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString()
    return {
      label: `${month}월`,
      value: month,
    }
  })

  const handleYearSelect = (yearValue: string) => {
    setSelectedYear(Number(yearValue))
    if (value) {
      const currentMonth = value.split('년 ')[1]
      onChange(`${yearValue}년 ${currentMonth}`)
    }
  }

  const handleMonthSelect = (monthValue: string) => {
    onChange(`${selectedYear}년 ${monthValue}월`)
  }

  const selectedMonth = value?.split('년 ')[1]?.replace('월', '')
  const selectedYearStr = value?.split('년')[0]

  return (
    <div className={cn('flex items-center gap-8', className)}>
      <Select
        options={monthOptions}
        selectedValue={selectedMonth}
        onSingleChange={handleMonthSelect}
      >
        <Select.Trigger placeholder='월 선택' className='w-100' />
        <Select.Menu className='h-220 w-202 p-12'>
          <div className='row-gap-4 grid grid-cols-3 gap-8'>
            {monthOptions.map(option => (
              <Select.Option
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </div>
        </Select.Menu>
      </Select>
    </div>
  )
}
