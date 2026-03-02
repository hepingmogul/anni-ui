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

const outlineVariantClasses = {
  primary:
    'border border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 disabled:border-neutral-300 disabled:text-neutral-400',
  secondary:
    'border border-neutral-300 text-neutral-700 bg-transparent hover:bg-neutral-100 active:bg-neutral-200 disabled:border-neutral-200 disabled:text-neutral-400',
  ghost:
    'border border-neutral-200 text-neutral-700 bg-transparent hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
  danger:
    'border border-danger text-danger bg-transparent hover:bg-danger/10 active:bg-danger/20 disabled:border-neutral-300 disabled:text-neutral-400',
}

const plainVariantClasses = {
  primary:
    'text-primary hover:text-primary-hover active:text-primary-active disabled:text-neutral-400',
  secondary:
    'text-neutral-700 hover:text-neutral-900 active:text-neutral-900 disabled:text-neutral-400',
  ghost:
    'text-neutral-500 hover:text-neutral-700 active:text-neutral-800 disabled:text-neutral-400',
  danger:
    'text-danger hover:text-danger-hover active:text-danger-active disabled:text-neutral-400',
}

const sizeClasses = {
  xs: 'h-6 px-2 text-xs gap-1',
  sm: 'h-7 px-3 text-xs gap-1',
  md: 'h-9 px-4 text-sm gap-1.5',
  lg: 'h-11 px-5 text-base gap-2',
  xl: 'h-[3.25rem] px-6 text-lg gap-2.5',
}

const circleSizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
  xl: 'h-[3.25rem] w-[3.25rem] text-lg',
}

const iconSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    outline = false,
    plain = false,
    round = false,
    circle = false,
    block = false,
    tag,
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
  const Component = tag ?? 'button'
  const isNativeButton = Component === 'button'

  const IconComponent = icon
  const iconNode = loading ? (
    <Loader2 size={iconSizeMap[size]} className="animate-spin" />
  ) : IconComponent ? (
    <IconComponent size={iconSizeMap[size]} />
  ) : null

  const effectiveCircle = circle
  const effectiveRound = !circle && round

  let colorClasses: string
  if (plain) {
    colorClasses = plainVariantClasses[variant]
  } else if (outline) {
    colorClasses = outlineVariantClasses[variant]
  } else {
    colorClasses = variantClasses[variant]
  }

  const shapeSizeClasses = effectiveCircle ? circleSizeClasses[size] : sizeClasses[size]

  const nativeButtonProps = isNativeButton ? { disabled: isDisabled } : {}

  return (
    <Component
      ref={ref}
      {...nativeButtonProps}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        effectiveCircle || effectiveRound ? 'rounded-full' : 'rounded-md',
        colorClasses,
        shapeSizeClasses,
        block && 'w-full',
        className,
      )}
      {...props}
    >
      {iconPosition === 'left' && iconNode}
      {children}
      {iconPosition === 'right' && iconNode}
    </Component>
  )
})
