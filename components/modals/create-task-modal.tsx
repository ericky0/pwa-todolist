"use client";

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateTaskModal } from '@/hooks/useTaskModal'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTasksStore } from '@/hooks/useTasksStore';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

const formSchema = z.object({
  task: z.string().min(3, {
    message: 'O nome da sua tarefa deve ter no mínimo 3 letras.'
  }),
  category: z.string().min(3, {
    message: 'O nome da sua categoria deve ter no mínimo 3 letras.'
  })
})

const categories = [
  '💰 Finanças',
  '💞 Casamento',
  '🖥️ Trabalho',
  '🏠 Casa',
  '🛒 Lista de Compras',
  '👨‍👩‍👧‍👦 Família',
]

const CreateTaskModal = () => {
  
  const [ category, setCategory ] = useState('')
  const { addTask, tasks } = useTasksStore()
  const createTaskModal = useCreateTaskModal()
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      category: '',
    }
  })

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      addTask({ id: v4(), task: values.task, category: values.category, checked: false })
      toast.success('Tarefa adicionada com sucesso!')
      createTaskModal.onClose()
      console.log(tasks)
    } catch (error) {
      toast.error('Alguma coisa deu errado!')
    } finally {
      setLoading(false)
    }
  }

  return (
  <Modal
    open={createTaskModal.isOpen}
    onClose={createTaskModal.onClose}
  >
    <Box 
    component='form'
    onSubmit={handleSubmit(onSubmit)}
    className='
      absolute
      top-[50%] 
      left-[50%] 
      translate-x-[-50%]
      translate-y-[-50%]
      w-[360px]
      p-8
      bg-[#D9D9D9]
      shadow-lg shadow-indigo-400/30
      rounded
    '>
      <Typography id="modal-modal-title" variant="h4" component="h2" className='font-bold mb-7'>
        Adicionar Tarefa
      </Typography>
      
      
      <div className='flex flex-col gap-4'>
          <TextField 
            id="filled-basic" 
            label="Tarefa" 
            variant="outlined" 
            className='bg-white' 
            fullWidth 
            disabled={loading}
            {...register('task')}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Categoria"
              {...register('category')}
              onChange={handleChange}
              disabled={loading}
              className='bg-white'
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        <Button variant="contained" className='bg-[#515CC6] hover:bg-[#6272ff] mt-5 font-medium text-lg capitalize' type='submit' fullWidth>adicionar</Button>
      </div>

    </Box>
  </Modal>
  )
}

export default CreateTaskModal