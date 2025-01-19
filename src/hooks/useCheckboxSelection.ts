import { useState } from 'react'

interface UseCheckboxSelectionProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

export function useCheckboxSelection({
  totalItems,
  itemsPerPage,
  currentPage,
}: UseCheckboxSelectionProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const getCurrentPageIndices = () => {
    return Array.from(
      {
        length: Math.min(
          itemsPerPage,
          totalItems - (currentPage - 1) * itemsPerPage
        ),
      },
      (_, index) => (currentPage - 1) * itemsPerPage + index
    )
  }

  const handleCheckboxChange = (index: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index
    setSelectedItems(prev =>
      prev.includes(globalIndex)
        ? prev.filter(item => item !== globalIndex)
        : [...prev, globalIndex]
    )
  }

  const handleSelectAll = () => {
    const currentPageIndices = getCurrentPageIndices()
    if (currentPageIndices.every(index => selectedItems.includes(index))) {
      setSelectedItems(prev =>
        prev.filter(item => !currentPageIndices.includes(item))
      )
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...currentPageIndices])])
    }
  }

  return {
    selectedItems,
    handleCheckboxChange,
    handleSelectAll,
    isAllSelected: getCurrentPageIndices().every(index =>
      selectedItems.includes(index)
    ),
  }
}
