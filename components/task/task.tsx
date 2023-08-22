"use client";

import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import Label from './label';
import { useTasksStore } from '@/hooks/useTasksStore';
import toast from 'react-hot-toast';

interface TaskProps {
  id: string;
  checked?: boolean
  label: string,
  category?: string
}

const Task = ({checked, label, category, id}: TaskProps) => {

  const [ disable, setDisable ] = useState(false)
  const {toggleTask} = useTasksStore()

  const onClick = () => {
    try {
      toggleTask(id)
      setDisable(true)
    } catch (error) {
      toast.error('Alguma coisa deu errado.')
    }
    toast.success("Tarefa Completada!")
  }

  return (
    <div className='flex flex-row'>
        <FormControlLabel 
          control={<Checkbox checked={checked} onClick={checked || disable ? () => {} : onClick} />} 
          label={<Label label={label} category={checked || disable ? '' : category} />}
          disabled={checked || disable}
        />
    </div>
  )
}

export default Task