"use client";

import Task from '@/components/task/task';
import TaskInterface from '@/types/Task'
import { useTasksStore } from '@/hooks/useTasksStore';
import { FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaUndo } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import toast from 'react-hot-toast';

const Home = () => {

  const [checkedTasks, setCheckedTasks] = useState<TaskInterface[]>()
  const [nonCheckedTasks, setNonCheckedTasks] = useState<TaskInterface[]>([])
  const tasks = useTasksStore((state) => state.tasks)
  const { toggleTask, removeTask } = useTasksStore()

  const undoTask = async (id: string) => {
    try {
      toggleTask(id)
      toast.success("A tarefa foi adicionada à lista de afazares mais uma vez!")
    } catch (error) {
      console.log(error)
      toast.error('Alguma coisa deu errado.')
    }
  }
  const deleteTask = async (id: string) => {
    try {
      removeTask(id)
      toast.success("A tarefa foi removida com sucesso!")
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
    <div className='flex flex-col justify-center'>
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
      
      <FormGroup className='mt-10 pb-10'>
        <span className='font-bold'>Completas</span>
        {checkedTasks?.map((task) => (
          <div key={task.id} className='flex flex-row items-center'>
            <Task label={task.task} checked={task.checked} id={task.id}/>
            <div className='flex gap-2 items-center'>
              <FaUndo onClick={() => {undoTask(task.id)}} className='cursor-pointer text-lg'/>
              <MdDeleteOutline className='text-2xl text-red-600' onClick={() => {deleteTask(task.id)}}/>
            </div>
          </div>
        ))}
      </FormGroup>
    </div>
  )
}

export default Home