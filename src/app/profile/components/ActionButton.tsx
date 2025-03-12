import { ArrowRight } from 'lucide-react'

interface ActionButtonProps {
  variant?: 'primary' | 'secondary'
  label: string
  onClick: () => void
}

export default function ActionButton ({
  variant = 'primary',
  label,
  onClick
}: ActionButtonProps) {
  const baseClasses =
    'w-full cursor-pointer py-4 px-6 rounded-xl flex gap-2 justify-center items-center'
  const classes =
    variant === 'primary'
      ? `${baseClasses} bg-red-600`
      : `${baseClasses} border border-gray-600`

  return (
    <button className={classes} onClick={onClick}>
      <span className='text-xl font-medium'>{label}</span>
      <ArrowRight className='h-6 w-6' />
    </button>
  )
}
