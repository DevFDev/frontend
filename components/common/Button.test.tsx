import { fireEvent, render, screen } from '@testing-library/react'

import Button from '@/components/common/Button'

test('기본 버튼 렌더링 및 클릭 이벤트 테스트', () => {
  const handleClick = jest.fn()
  render(<button onClick={handleClick}>클릭하세요</button>)

  const buttonElement = screen.getByText('클릭하세요')
  expect(buttonElement).toBeInTheDocument()

  fireEvent.click(buttonElement)
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('버튼이 제대로 렌더링되고 클릭 이벤트가 작동하는지 확인', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>클릭하세요</Button>)

  const buttonElement = screen.getByText('클릭하세요')
  expect(buttonElement).toBeInTheDocument()

  fireEvent.click(buttonElement)
  expect(handleClick).toHaveBeenCalledTimes(1)
})
