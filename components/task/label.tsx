

interface LabelProps {
  label: string
  category?: string
}

const Label = ({label, category}: LabelProps) => {
  return (
    <div className={`flex flex-col ${category && 'mt-5'}`}>
      <span>{label}</span>
      {category && <span className="text-sm text-stone-400">{category}</span>}
    </div>
  )
}

export default Label