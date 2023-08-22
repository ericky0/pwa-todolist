import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import Label from './label';
import { useTasksStore } from '@/hooks/useTasksStore';
import { toast } from 'react-hot-toast';

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
      toast.success('Tarefa completada!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <FormControlLabel 
          control={<Checkbox checked={checked}/>} 
          label={<Label label={label} category={checked || disable ? '' : category} />} 
          onClick={checked || disable ? () => {} : onClick} 
          disabled={checked || disable}
        /> 
  )
}

export default Task