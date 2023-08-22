"use client";

import Task from '@/components/task/task';
import TaskInterface from '@/types/Task'
import { useTasksStore } from '@/hooks/useTasksStore';
import { FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaUndo } from 'react-icons/fa'
import toast from 'react-hot-toast';

const Home = () => {

  const [checkedTasks, setCheckedTasks] = useState<TaskInterface[]>()
  const [nonCheckedTasks, setNonCheckedTasks] = useState<TaskInterface[]>([])
  const tasks = useTasksStore((state) => state.tasks)
  const { toggleTask } = useTasksStore()

  const undoTask = async (id: string) => {
    try {
      toggleTask(id)
      toast.success("A tarefa foi adicionada à lista de afazares mais uma vez!")
    } catch (error) {
      console.log(error)
      toast.error('Alguma coisa deu errado.')
    }
  }

  useEffect(() => {
    let checkedTasks = tasks.filter((task) => task.checked === true)
    setCheckedTasks(checkedTasks)

    let nonCheckedTasks = tasks.filter((task) => task.checked === false)
    setNonCheckedTasks(nonCheckedTasks)

  }, [tasks])
  
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4'>
        <span className='text-3xl font-bold lg:text-5xl'>22 de agosto, 2023</span>
        <p>{nonCheckedTasks.length} incompletas, {checkedTasks?.length} completas</p>
      </div>
      <hr className='mt-4 mb-4'/>
      <FormGroup>
        <span className='font-bold'>A fazer</span>
        {nonCheckedTasks.map((task) => (
          <Task key={task.id} label={task.task} category={task.category} id={task.id}/>
        ))}
      </FormGroup>
      
      <FormGroup className='mt-10'>
        <span className='font-bold'>Completas</span>
        {checkedTasks?.map((task) => (
          <div key={task.id} className='flex flex-row items-center'>
            <Task label={task.task} checked={task.checked} id={task.id}/>
            <FaUndo onClick={() => {undoTask(task.id)}} className='cursor-pointer'/>
          </div>
        ))}
      </FormGroup>
    </div>
  )
}

export default Home