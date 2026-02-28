import { cn } from '../utils/cn'
import type { BadgeProps } from './Badge.types'

const variantClasses = {
  default: 'bg-neutral-500 text-neutral-fg',
  success: 'bg-success text-success-fg',
  warning: 'bg-warning text-warning-fg',
  danger:  'bg-danger text-danger-fg',
  info:    'bg-info text-info-fg',
}

export function Badge({
  variant = 'danger',
  count,
  dot = false,
  max = 99,
  showZero = false,
  children,
  className,
  ...props
}: BadgeProps) {
  const displayCount = count !== undefined && count > max ? `${max}+` : count

  const shouldShow = dot || (count !== undefined && (count > 0 || showZero))

  if (!children) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center font-medium',
          dot
            ? 'h-2 w-2 rounded-full'
            : 'h-5 min-w-5 rounded-full px-1.5 text-xs',
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {!dot && displayCount}
      </span>
    )
  }

  return (
    <span className="relative inline-flex">
      {children}
      {shouldShow && (
        <span
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center font-medium',
            dot
              ? 'h-2 w-2 rounded-full'
              : 'h-5 min-w-5 rounded-full px-1.5 text-xs',
            variantClasses[variant],
            className,
          )}
          {...props}
        >
          {!dot && displayCount}
        </span>
      )}
    </span>
  )
}
