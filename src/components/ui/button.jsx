export const buttonVariants = {
  base: 'rounded-md text-sm font-semibold ring-offset-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:scale-105 transition text-nowrap',
  variants: {
    variant: {
      default:
        'border border-[#5e8e95] bg-[#5e8e95] text-white hover:bg-[#5e8e95]/85 hover:border-[#5e8e95]/85 dark:border-[#9decf9] dark:bg-[#9decf9] dark:text-black dark:hover:bg-[#9decf9]/85 dark:hover:border-[#9decf9]/85',
      secondary:
        'border dark:border-neutral-100 border-slate-700 hover:border-slate-700/85 bg-slate-700 text-white dark:bg-neutral-100 dark:text-[#1a202c] hover:bg-slate-700/85 dark:hover:bg-neutral-100/85 dark:hover:border-bg-neutral-100/85',
      outline:
        'border border-slate-800 dark:border-slate-400 bg-transparent hover:opacity-75',
      danger:
        'border dark:border-red-200 border-red-600 bg-transparent darkhover:bg-red-500 hover:bg-red-600 dark:hover:border-red-500 hover:border-red-600 dark:text-red-200 text-red-600 hover:text-red-50'
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-7 rounded-md px-2.5',
      lg: 'h-11 rounded-md px-8'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
}

export default function Button({
  children,
  onClick,
  type = 'button',
  size = buttonVariants.defaultVariants.size,
  variant = buttonVariants.defaultVariants.variant,
  className = '',
  ...props
}) {
  return (
    <button
      role="button"
      type={type}
      className={`${buttonVariants.base} ${buttonVariants.variants.size[size]} ${buttonVariants.variants.variant[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
