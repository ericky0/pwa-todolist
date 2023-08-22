import Task from '@/types/Task'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



interface useTasksStore {
  tasks: Task[]
  addTask: (task: Task) => void
  toggleTask: (taskId: Task['id']) => void
}

export const useTasksStore = create<useTasksStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (taskId) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === taskId ? {...task, checked: !task.checked} : task)
      }))
    }),
    {
      name: "tasks-storage",
    },
  )
)