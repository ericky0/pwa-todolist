"use client";

import Task from '@/components/task/task';
import TaskInterface from '@/types/Task'
import { useTasksStore } from '@/hooks/useTasksStore';
import { FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid'


const checkedTasks = [
  {
    id: v4(),
    label: 'varrer a casa',
    category: 'casa',
    checked: true
  },
  {
    id: v4(),
    label: 'pagar a conta de luz',
    category: 'casa',
    checked: true
  }
]

const nonCheckedTasks = [
  {
    id: v4(),
    label: 'sair com o cachorro',
    category: 'animais'
  },
  {
    id: v4(),
    label: 'sair com a namorada',
    category: 'vida pessoal'
  }
]

const Home = () => {

  const [checkedTasks, setCheckedTasks] = useState<TaskInterface[]>()
  const [nonCheckedTasks, setNonCheckedTasks] = useState<TaskInterface[]>([])
  const tasks = useTasksStore((state) => state.tasks)

  useEffect(() => {
    let checkedTasks = tasks.filter((task) => task.checked === true)
    setCheckedTasks(checkedTasks)

    let nonCheckedTasks = tasks.filter((task) => task.checked === false)
    setNonCheckedTasks(nonCheckedTasks)
  }, [tasks])
  
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <span className='text-5xl font-bold'>22 de agosto, 2023</span>
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
          <Task key={task.id} label={task.task} checked={task.checked} id={task.id}/>
        ))}
      </FormGroup>
    </div>
  )
}

export default Home