import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Chip } from './Chip'

describe('Chip Component', () => {
  test('renders the Chip component with correct label', () => {
    // Chip 컴포넌트가 올바른 라벨을 렌더링하는지 확인합니다.
    render(<Chip label='모집 중' />)
    const chipElement = screen.getByText(/모집 중/i)
    expect(chipElement).toBeInTheDocument()
  })

  test('applies correct styles for each label', () => {
    // 각 라벨에 대해 올바른 스타일이 적용되는지 확인합니다.
    const labelStyles = {
      '모집 중': 'bg-blue-100 text-blue-500',
      '모집 완료': 'bg-gray-200 text-gray-600',
      스터디: 'bg-green-100 text-green-500',
      프로젝트: 'bg-purple-100 text-purple-500',
      멘토링: 'bg-red-100 text-red-500',
      기술: 'bg-blue-100 text-blue-500',
      커리어: 'bg-pink-100 text-pink-500',
      기타: 'bg-orange-100 text-orange-500',
    }

    Object.entries(labelStyles).forEach(([label, expectedClasses]) => {
      render(<Chip label={label} />)
      const chipElement = screen.getByText(label)

      // expectedClasses에 포함된 각 클래스가 chipElement에 포함되는지 확인합니다.
      expectedClasses.split(' ').forEach(className => {
        expect(chipElement).toHaveClass(className)
      })
    })
  })

  test('applies additional className passed as prop', () => {
    // className prop을 통해 추가된 클래스가 Chip 컴포넌트에 적용되는지 확인합니다.
    render(<Chip label='기술' className='custom-class' />)
    const chipElement = screen.getByText(/기술/i)
    expect(chipElement).toHaveClass('custom-class')
  })

  test('applies base styles correctly', () => {
    // 기본 스타일이 Chip 컴포넌트에 올바르게 적용되는지 확인합니다.
    render(<Chip label='커리어' />)
    const chipElement = screen.getByText(/커리어/i)
    expect(chipElement).toHaveClass(
      'flex',
      'h-28',
      'items-center',
      'justify-center',
      'rounded-4',
      'px-6',
      'text-body3',
      'font-medium'
    )
  })

  test('applies default styles when label is not in styleByLabel', () => {
    // styleByLabel에 없는 라벨에 대해 기본 스타일이 적용되는지 확인합니다.
    render(<Chip label='기타 라벨' />)
    const chipElement = screen.getByText(/기타 라벨/i)
    expect(chipElement).toHaveClass('bg-gray-200', 'text-gray-500')
  })
})
