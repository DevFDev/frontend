import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { DeletableChip } from './DeletableChip'

describe('DeletableChip Component', () => {
  test('renders the chip with correct label', () => {
    // 올바른 label이 렌더링되는지 확인합니다.
    render(<DeletableChip label='스터디' onDelete={() => {}} />)
    const chipElement = screen.getByText(/스터디/i)
    expect(chipElement).toBeInTheDocument()
  })

  test('renders with the default blue color style', () => {
    // 기본 색상이 blue로 렌더링되는지 확인합니다.
    render(<DeletableChip label='스터디' onDelete={() => {}} />)
    const chipElement = screen.getByText(/스터디/i)
    expect(chipElement).toHaveClass('bg-blue-800', 'text-common-white')
  })

  test('renders with the gray color style when specified', () => {
    // gray 색상이 지정되었을 때 올바르게 스타일링되는지 확인합니다.
    render(<DeletableChip label='스터디' color='gray' onDelete={() => {}} />)
    const chipElement = screen.getByText(/스터디/i)
    expect(chipElement).toHaveClass(
      'border-1',
      'border-solid',
      'border-gray-200',
      'bg-gray-100',
      'text-gray-700'
    )
  })

  test('renders delete button with gray color style when chip color is gray', () => {
    // chip이 gray일 때 delete 버튼이 gray 스타일을 가지는지 확인합니다.
    render(<DeletableChip label='스터디' color='gray' onDelete={() => {}} />)
    const buttonElement = screen.getByRole('button', { name: /스터디 삭제/i })
    expect(buttonElement).toHaveClass('text-gray-400')
  })

  test('calls onDelete when delete button is clicked', () => {
    // 삭제 버튼 클릭 시 onDelete가 호출되는지 확인합니다.
    const handleDelete = jest.fn()
    render(<DeletableChip label='스터디' onDelete={handleDelete} />)
    const buttonElement = screen.getByRole('button', { name: /스터디 삭제/i })
    fireEvent.click(buttonElement)
    expect(handleDelete).toHaveBeenCalledTimes(1)
  })

  test('applies additional className when specified', () => {
    // 추가된 className이 적용되는지 확인합니다.
    render(
      <DeletableChip
        label='스터디'
        onDelete={() => {}}
        className='custom-class'
      />
    )
    const chipElement = screen.getByText(/스터디/i)
    expect(chipElement).toHaveClass('custom-class')
  })
})
