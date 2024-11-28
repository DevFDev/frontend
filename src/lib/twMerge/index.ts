import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeEx = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'heading1',
            'heading2',
            'heading3',
            'heading4',
            'heading5',
            'title1',
            'title2',
            'body1',
            'body2',
            'body3',
            'caption1',
            'caption2',
            'inherit',
          ],
        },
      ],
    },
  },
})
