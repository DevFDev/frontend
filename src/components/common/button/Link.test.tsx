import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Link } from './Link'

describe('Link Component', () => {
  test('renders the link with correct href', () => {
    render(<Link href='/test' label='Test Link' />)
    const linkElement = screen.getByRole('link', { name: /test link/i })
    expect(linkElement).toHaveAttribute('href', '/test')
  })

  test('prevents click when disabled', () => {
    const handleClick = jest.fn()
    render(
      <Link href='/test' label='Disabled Link' disabled onClick={handleClick} />
    )

    const linkElement = screen.getByRole('link', { name: /disabled link/i })
    fireEvent.click(linkElement)
    expect(handleClick).not.toHaveBeenCalled()
    expect(linkElement).toHaveAttribute('aria-disabled', 'true')
  })

  test('calls onClick when not disabled', () => {
    const handleClick = jest.fn()
    render(<Link href='/test' label='Enabled Link' onClick={handleClick} />)

    const linkElement = screen.getByRole('link', { name: /enabled link/i })
    fireEvent.click(linkElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders Clickable component with proper props', () => {
    render(<Link href='/test' label='Clickable Test' />)
    const clickableElement = screen.getByText(/clickable test/i)
    expect(clickableElement).toBeInTheDocument()
  })
})
