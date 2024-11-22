export const handleKeyDown = (
  e: React.KeyboardEvent,
  callback: () => void,
  disabled?: boolean
): void => {
  if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
    e.preventDefault()
    callback()
  }
}
