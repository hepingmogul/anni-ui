import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../utils/cn'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary:
    'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled',
  secondary:
    'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-400',
  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
  danger:
    'bg-danger text-danger-fg hover:bg-danger-hover active:bg-danger-active disabled:bg-danger-disabled',
}

const sizeClasses = {
  sm: 'h-7 px-3 text-xs gap-1',
  md: 'h-9 px-4 text-sm gap-1.5',
  lg: 'h-11 px-5 text-base gap-2',
}

const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    disabled,
    children,
    className,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  const IconComponent = icon
  const iconNode = loading ? (
    <Loader2 size={iconSizeMap[size]} className="animate-spin" />
  ) : IconComponent ? (
    <IconComponent size={iconSizeMap[size]} />
  ) : null

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {iconPosition === 'left' && iconNode}
      {children}
      {iconPosition === 'right' && iconNode}
    </button>
  )
})
