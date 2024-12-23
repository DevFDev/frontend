import { type ClassValue, clsx } from 'clsx'

import { twMergeEx } from './twMerge'

export const cn = (...inputs: ClassValue[]): string => {
  return twMergeEx(clsx(inputs))
}
