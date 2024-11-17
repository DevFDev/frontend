import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button Component', () => {
  test('renders the Button with the correct label', () => {
    // 버튼이 올바른 레이블로 렌더링되는지 확인합니다.
    render(<Button label='Click Me' />)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls onClick when the button is clicked', () => {
    // 버튼이 클릭될 때 onClick 핸들러가 호출되는지 확인합니다.
    const handleClick = jest.fn()
    render(<Button label='Click Me' onClick={handleClick} />)

    const buttonElement = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when the button is disabled', () => {
    // 버튼이 비활성화되었을 때 onClick 핸들러가 호출되지 않는지 확인합니다.
    const handleClick = jest.fn()
    render(<Button label='Click Me' onClick={handleClick} disabled />)

    const buttonElement = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(buttonElement)

    expect(handleClick).not.toHaveBeenCalled()
  })

  test('passes additional props to the Clickable component', () => {
    // Button 컴포넌트가 Clickable 컴포넌트에 추가적인 props를 올바르게 전달하는지 확인합니다.
    render(<Button label='Click Me' variant='outlined' size='lg' />)
    const clickableElement = screen.getByText(/click me/i)

    expect(clickableElement).toHaveClass('text-primary-normal')
    expect(clickableElement).toHaveClass('h-48') // "lg" 크기가 h-48 클래스를 적용하는지 확인
    expect(clickableElement).toHaveClass('border-1') // "outlined" 변형이 border-1 클래스를 적용하는지 확인
  })
})
