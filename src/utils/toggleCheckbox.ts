export const toggleCheckbox = (
  currentChecked: boolean,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  value: string | number | readonly string[] | undefined
): void => {
  if (onChange) {
    onChange({
      target: { checked: !currentChecked, value },
    } as React.ChangeEvent<HTMLInputElement>)
  }
}
