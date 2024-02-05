import Button, { buttonVariants } from './ui/button'

export default function ButtonIcon({
  children,
  onClick,
  text,
  type = 'button',
  size = buttonVariants.defaultVariants.size,
  variant = buttonVariants.defaultVariants.variant,
  className = ''
}) {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      className={`flex items-center gap-x-2 ${className}`}
      onClick={onClick}
    >
      {children} {text}
    </Button>
  )
}
