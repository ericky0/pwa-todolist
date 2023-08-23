import AddTask from "@/components/ui/add-task"

interface RootLayoutProps {
  children: React.ReactNode
}


const RootLayoutProps = ({children}: RootLayoutProps) => {
  return (
    <div className="flex justify-center h-full w-full p-6">
      <AddTask /> 
      {children}
    </div>
  )
}

export default RootLayoutProps