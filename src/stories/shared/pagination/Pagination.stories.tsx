import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/shared/pagination'

import { UsePaginationProps, usePagination } from '@/hooks/usePagination'

export default {
  title: 'Shared/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: { control: 'number', defaultValue: 100 },
    itemsPerPage: { control: 'number', defaultValue: 6 },
    buttonsPerPage: { control: 'number', defaultValue: 10 },
  },
} as Meta

const PaginationWrapper = ({
  totalItems,
  itemsPerPage,
  buttonsPerPage = 10,
}: UsePaginationProps) => {
  const paginationState = usePagination({
    totalItems,
    itemsPerPage,
    buttonsPerPage,
  })

  return (
    <div className='p-4'>
      <Pagination {...paginationState} />
      <div className='text-sm mt-4 text-gray-700'>
        <p>
          <strong>현재 페이지:</strong> {paginationState.currentPage}
        </p>
        <p>
          <strong>현재 그룹:</strong>{' '}
          {Math.ceil(paginationState.currentPage / buttonsPerPage)}
        </p>
      </div>
    </div>
  )
}

export const Default: StoryObj<UsePaginationProps> = {
  args: {
    totalItems: 100,
    itemsPerPage: 6,
    buttonsPerPage: 10,
  },
  render: args => <PaginationWrapper {...args} />,
}
