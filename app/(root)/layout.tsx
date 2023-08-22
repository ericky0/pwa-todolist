import AddTask from "@/components/ui/add-task"

interface RootLayoutProps {
  children: React.ReactNode
}


const RootLayoutProps = ({children}: RootLayoutProps) => {
  return (
    <div className="flex justify-center items-center h-full w-full p-6">
      {children}
      <AddTask />
    </div>
  )
}

export default RootLayoutProps