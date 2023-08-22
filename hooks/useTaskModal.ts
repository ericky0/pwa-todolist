import { create } from 'zustand'

interface useCreateTaskModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useCreateTaskModal = create<useCreateTaskModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))