import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Link } from './Link'

describe('Link Component', () => {
  test('renders the link with correct href', () => {
    // 올바른 href 속성을 가진 링크가 렌더링되는지 확인합니다.
    render(<Link href='/test' label='Test Link' />)
    const linkElement = screen.getByRole('link', { name: /test link/i })
    expect(linkElement).toHaveAttribute('href', '/test')
  })

  test('prevents click when disabled', () => {
    // disabled 상태일 때 클릭 이벤트가 실행되지 않는지 확인합니다.
    const handleClick = jest.fn()
    render(
      <Link href='/test' label='Disabled Link' disabled onClick={handleClick} />
    )

    const linkElement = screen.getByRole('link', { name: /disabled link/i })
    fireEvent.click(linkElement)
    expect(handleClick).not.toHaveBeenCalled()
    expect(linkElement).toHaveAttribute('aria-disabled', 'true')
  })

  test('renders Clickable component with proper props', () => {
    // Clickable 컴포넌트가 올바른 props와 함께 렌더링되는지 확인합니다.
    render(<Link href='/test' label='Clickable Test' />)
    const clickableElement = screen.getByText(/clickable test/i)
    expect(clickableElement).toBeInTheDocument()
  })

  test('applies custom className to the Clickable component', () => {
    // Link 컴포넌트가 전달된 className을 Clickable 컴포넌트에 적용하는지 확인합니다.
    render(<Link href='/test' label='Styled Link' className='custom-class' />)
    const clickableElement = screen.getByText(/styled link/i)
    expect(clickableElement).toHaveClass('custom-class')
  })
})
