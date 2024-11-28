import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/shared/pagination'

import { usePagination } from '@/hooks/usePagination'

export default {
  title: 'Shared/Pagination/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 }, defaultValue: 1 },
    totalPages: { control: { type: 'number', min: 1 }, defaultValue: 5 },
    hasNextPage: { control: 'boolean', defaultValue: true },
    hasPreviousPage: { control: 'boolean', defaultValue: false },
  },
} as Meta

export const Default: StoryObj = {
  args: {
    currentPage: 1,
    pageButtons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    totalPages: 5,
    hasNextPageGroup: true,
    hasPreviousPageGroup: true,
    goToPage: (page: number) => alert(`Go to page: ${page}`),
    goToNextPageGroup: () => alert('Next page'),
    goToPreviousPageGroup: () => alert('Previous page'),
  },
}
