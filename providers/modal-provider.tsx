"use client";

import CreateTaskModal from "@/components/modals/create-task-modal"
import { useEffect, useState } from "react"

const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateTaskModal />
    </>
  )
}

export default ModalProvider