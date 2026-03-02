import { forwardRef } from 'react'
import { cn } from '../utils/cn'
import type { InputProps } from './Input.types'

const sizeClasses = {
  sm: 'h-7 text-xs px-2',
  md: 'h-9 text-sm px-3',
  lg: 'h-11 text-base px-4',
}

const addonSizeClasses = {
  sm: 'px-2 text-xs',
  md: 'px-3 text-sm',
  lg: 'px-4 text-base',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', prefix, suffix, disabled, className, id, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        'flex items-center rounded-md border bg-surface transition-colors',
        'border-neutral-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-ring focus-within:ring-offset-1',
        'has-[input[aria-invalid="true"]]:border-danger has-[input[aria-invalid="true"]]:focus-within:ring-danger',
        disabled && 'bg-neutral-50 cursor-not-allowed opacity-60',
      )}
    >
      {prefix && (
        <span
          className={cn(
            'flex items-center text-neutral-500 border-r border-neutral-300 bg-neutral-50 self-stretch',
            addonSizeClasses[size],
          )}
        >
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(
          'flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400',
          'disabled:cursor-not-allowed',
          sizeClasses[size],
          prefix && 'rounded-l-none',
          suffix && 'rounded-r-none',
          className,
        )}
        {...props}
      />
      {suffix && (
        <span
          className={cn(
            'flex items-center text-neutral-500 border-l border-neutral-300 bg-neutral-50 self-stretch',
            addonSizeClasses[size],
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  )
})
