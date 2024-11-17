import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  content: React.ReactElement | null
  openModal: (content: React.ReactElement) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  content: null,
  openModal: content => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}))

export default useModalStore
