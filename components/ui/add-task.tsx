"use client";

import { IoMdAdd } from "react-icons/io"
import { useCreateTaskModal } from "@/hooks/useTaskModal"


const AddTask = () => {

  const createTaskModal = useCreateTaskModal()

  const onChange = async () => {
    createTaskModal.onOpen()
  }

  return (
  <a 
    className="
      flex
      items-center
      justify-center
      fixed 
      w-[56px] 
      h-[56px] 
      bottom-[40px] 
      right-[40px] 
      bg-[#515CC6]
      rounded-full
      cursor-pointer
    "
    target="_blank"
    onClick={onChange}
    
    >
      <IoMdAdd className="text-4xl text-white"/>
  </a>
  )
}

export default AddTask