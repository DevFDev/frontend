import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Dropdown } from './Dropdown'

describe('Dropdown Component', () => {
  it('renders children correctly', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )

    // Trigger 버튼이 렌더링되었는지 확인
    expect(screen.getByText('Open Menu')).toBeInTheDocument()

    // Menu의 아이템이 초기에는 보이지 않아야 함
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })

  it('opens the menu when the trigger is clicked', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )

    const trigger = screen.getByText('Open Menu')

    // Trigger 버튼 클릭
    fireEvent.click(trigger)

    // Menu의 아이템이 보여야 함
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('closes the menu when an item is clicked', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )

    const trigger = screen.getByText('Open Menu')

    // Trigger 버튼 클릭
    fireEvent.click(trigger)

    // Menu의 아이템이 보여야 함
    const item = screen.getByText('Item 1')
    fireEvent.click(item)

    // Menu가 닫혀야 함
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })

  it('does not close the menu when closeOnSelect is false', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item closeOnSelect={false}>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )

    const trigger = screen.getByText('Open Menu')

    // Trigger 버튼 클릭
    fireEvent.click(trigger)

    // Menu의 아이템이 보여야 함
    const item = screen.getByText('Item 1')
    fireEvent.click(item)

    // Menu가 닫히지 않아야 함
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('closes the menu when clicking outside the dropdown', () => {
    render(
      <>
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button>Outside Button</button>
      </>
    )

    const trigger = screen.getByText('Open Menu')
    const outsideButton = screen.getByText('Outside Button')

    // Trigger 버튼 클릭
    fireEvent.click(trigger)

    // Menu의 아이템이 보여야 함
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()

    // Dropdown 외부 클릭
    fireEvent.click(outsideButton)

    // Menu가 닫혀야 함
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })
})
