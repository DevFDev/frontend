export const handleKeyDown = (
  e: React.KeyboardEvent,
  callback: () => void,
  disabled?: boolean
): void => {
  if (e.key === 'Enter' && !disabled) {
    callback()
  }
}
