export const joinWithHash = (items: string[]): string => {
  return items.map(item => `#${item}`).join('')
}
