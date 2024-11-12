// Text.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Text } from '@/components/common/text'

describe('Text Component', () => {
  test('renders Text.Heading with correct tag and style', () => {
    // Text.Heading 컴포넌트가 올바른 태그(h1)와 스타일로 렌더링되는지 확인합니다.
    render(
      <Text.Heading as='h1' variant='heading1'>
        Heading Text
      </Text.Heading>
    )
    const heading = screen.getByText(/heading text/i)

    expect(heading.tagName).toBe('H1') // 태그가 h1인지 확인
    expect(heading).toHaveClass('text-heading1', 'text-gray-800', 'font-bold') // 스타일이 올바른지 확인
  })

  test('renders Text.Title with correct tag and style', () => {
    // Text.Title 컴포넌트가 올바른 태그(h4)와 스타일로 렌더링되는지 확인합니다.
    render(
      <Text.Title as='h4' variant='title1'>
        Title Text
      </Text.Title>
    )
    const title = screen.getByText(/title text/i)

    expect(title.tagName).toBe('H4') // 태그가 h4인지 확인
    expect(title).toHaveClass('text-title1', 'text-gray-800', 'font-bold') // 스타일이 올바른지 확인
  })

  test('renders Text.Body with default tag (p) and style', () => {
    // Text.Body 컴포넌트가 기본 태그(p)와 올바른 스타일로 렌더링되는지 확인합니다.
    render(<Text.Body variant='body1'>Body Text</Text.Body>)
    const body = screen.getByText(/body text/i)

    expect(body.tagName).toBe('P') // 기본 태그가 p인지 확인
    expect(body).toHaveClass('text-body1', 'text-gray-800', 'font-bold') // 스타일이 올바른지 확인
  })

  test('renders Text.Caption with correct tag and style', () => {
    // Text.Caption 컴포넌트가 올바른 태그(span)와 스타일로 렌더링되는지 확인합니다.
    render(
      <Text.Caption as='span' variant='caption1'>
        Caption Text
      </Text.Caption>
    )
    const caption = screen.getByText(/caption text/i)

    expect(caption.tagName).toBe('SPAN') // 태그가 span인지 확인
    expect(caption).toHaveClass('text-caption1', 'text-gray-800', 'font-bold') // 스타일이 올바른지 확인
  })

  test('applies color and weight correctly to Text.Heading', () => {
    // Text.Heading 컴포넌트에 color와 weight 속성이 올바르게 적용되는지 확인합니다.
    render(
      <Text.Heading as='h2' variant='heading2' color='positive' weight='600'>
        Custom Heading
      </Text.Heading>
    )
    const heading = screen.getByText(/custom heading/i)

    expect(heading).toHaveClass(
      'text-heading2',
      'text-semantic-positive',
      'font-semibold'
    ) // 스타일이 올바른지 확인
  })

  test('applies custom className', () => {
    // Text.Body 컴포넌트에 커스텀 className이 올바르게 적용되는지 확인합니다.
    render(
      <Text.Body variant='body2' className='custom-class'>
        Custom Body
      </Text.Body>
    )
    const body = screen.getByText(/custom body/i)

    expect(body).toHaveClass('custom-class') // 커스텀 클래스가 적용되었는지 확인
  })
})
