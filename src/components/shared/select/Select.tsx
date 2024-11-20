import { Dropdown } from '@/components/common/dropdown'

interface SelectProps {}

export const Select = (): JSX.Element => {
  return (
    <Dropdown>
      <Dropdown.Trigger>Select options</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item closeOnSelect={false}>Option 1</Dropdown.Item>
        <Dropdown.Item closeOnSelect={false}>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
