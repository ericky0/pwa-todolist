import AddTask from "@/components/ui/add-task"

interface RootLayoutProps {
  children: React.ReactNode
}


const RootLayoutProps = ({children}: RootLayoutProps) => {
  return (
    <div className="flex justify-center items-center h-max w-full p-6 m-4">
      <AddTask />
      {children}
    </div>
  )
}

export default RootLayoutProps