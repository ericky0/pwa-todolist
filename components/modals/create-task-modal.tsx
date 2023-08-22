"use client";

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateTaskModal } from '@/hooks/useTaskModal'
import { Backdrop, Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, TextField, Typography } from '@mui/material'
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
  const { addTask } = useTasksStore()
  const createTaskModal = useCreateTaskModal()
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
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
    try {
      setLoading(true)
      addTask({ id: v4(), task: values.task, category: values.category, checked: false })
      toast.success("Tarefa adicionada com sucesso!")
      createTaskModal.onClose()
    } catch (error) {
      toast.error("Alguma coisa deu errado.")
    } finally {
      reset()
      setLoading(false)
    }
  }

  return (
  <Modal
    open={createTaskModal.isOpen}
    onClose={createTaskModal.onClose}
    closeAfterTransition
    slots={{backdrop: Backdrop}}
    slotProps={{
      backdrop: {
        timeout: 500
      }
    }}
  >
    <Fade in={createTaskModal.isOpen}>
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
        <h2 className='font-bold text-2xl mb-7'>Adicionar tarefa</h2>

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
    </Fade>
  </Modal>
  )
}

export default CreateTaskModal