export const inputVariants = {
  initial: '',
  variants: {
    variant: {
      default:
        'dark:focus:outline-blue-200 rounded-lg dark:text-white focus:outline-1 bg-gray-50 focus:bg-white dark:bg-gray-900/20 block py-2 px-2.5 focus:outline border border-slate-400 dark:focus:border-blue-200 font-light text-base overflow-hidden dark:placeholder:text-gray-400 placeholder:italic dark:focus:bg-slate-900/40 placeholder:font-normal placeholder:text-gray-500 focus:border-blue-500 focus:outline-blue-500 text-black',
      checkbox: 'dark:accent-cyan-200 w-4 h-4 rounded'
    },
    size: {
      default: 'w-full',
      empty: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
}

export default function Input({
  id,
  type = 'text',
  className = '',
  placeholder = '',
  size = inputVariants.defaultVariants.size,
  variant = inputVariants.defaultVariants.variant,
  ...props
}) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className={`${inputVariants.initial} ${inputVariants.variants.variant[variant]} ${inputVariants.variants.size[size]} ${className}`}
      {...props}
    />
  )
}
