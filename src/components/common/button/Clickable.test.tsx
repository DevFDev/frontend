import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Clickable, ClickableProps } from './Clickable'

describe('Clickable Component', () => {
  const defaultProps: ClickableProps = {
    label: 'Click me',
  }

  test('renders label correctly', () => {
    // label이 제대로 렌더링되는지 확인합니다.
    render(<Clickable {...defaultProps} />)
    const element = screen.getByText('Click me')
    expect(element).toBeInTheDocument()
  })

  test('applies the correct variant class', () => {
    // variant가 'outlined'일 때 해당 클래스가 제대로 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} variant='outlined' />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass(
      'border-1 border-solid border-primary-normal bg-common-white text-primary-normal'
    )
  })

  test('applies the correct size class', () => {
    // size가 'lg'일 때 크기 관련 클래스가 제대로 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} size='lg' />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('h-48 px-16')
  })

  test('applies the fullWidth class when fullWidth is true', () => {
    // fullWidth가 true일 때 'w-full' 클래스가 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} fullWidth />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('w-full')
  })

  test('applies the leftAlign class when leftAlign is true', () => {
    // leftAlign이 true일 때 'justify-start' 클래스가 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} leftAlign />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('justify-start')
  })

  test('applies disabled styles when disabled is true', () => {
    // disabled가 true일 때 비활성화 관련 스타일과 aria-disabled 속성이 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} disabled />)
    const element = screen.getByText('Click me')
    expect(element).toHaveAttribute('aria-disabled', 'true')
    expect(element).toHaveClass(
      'aria-disabled:border-0 aria-disabled:bg-gray-100 aria-disabled:text-gray-400 aria-disabled:cursor-not-allowed'
    )
  })

  test('renders startIcon and endIcon if provided', () => {
    // startIcon과 endIcon이 제공되었을 때 각각 렌더링되는지 확인합니다.
    const StartIcon = () => <span data-testid='start-icon'>Start</span>
    const EndIcon = () => <span data-testid='end-icon'>End</span>
    render(
      <Clickable
        {...defaultProps}
        startIcon={<StartIcon />}
        endIcon={<EndIcon />}
      />
    )

    const startIcon = screen.getByTestId('start-icon')
    const endIcon = screen.getByTestId('end-icon')

    expect(startIcon).toBeInTheDocument()
    expect(endIcon).toBeInTheDocument()
  })

  test('applies the correct text color class', () => {
    // textColor가 'gray400'일 때 텍스트 색상 클래스가 올바르게 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} textColor='gray400' />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('text-gray-400')
  })

  test('applies the correct background color class', () => {
    // backgroundColor가 'blue'일 때 배경 색상 클래스가 올바르게 적용되는지 확인합니다.
    render(<Clickable {...defaultProps} backgroundColor='blue' />)
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('bg-primary-normal')
  })

  test('applies the correct border color class', () => {
    // borderColor가 'gray'이고 variant가 'outlined'일 때 테두리 색상 클래스가 올바르게 적용되는지 확인합니다.
    render(
      <Clickable {...defaultProps} variant='outlined' borderColor='gray' />
    )
    const element = screen.getByText('Click me')
    expect(element).toHaveClass('border-gray-200')
  })
})
