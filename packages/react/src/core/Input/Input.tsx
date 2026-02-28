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

export function Input({
  size = 'md',
  prefix,
  suffix,
  error = false,
  errorMessage,
  label,
  disabled,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center rounded-md border bg-surface transition-colors',
          error
            ? 'border-danger focus-within:ring-2 focus-within:ring-danger focus-within:ring-offset-1'
            : 'border-neutral-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-ring focus-within:ring-offset-1',
          disabled && 'bg-neutral-50 cursor-not-allowed opacity-60',
        )}
      >
        {prefix && (
          <span
            className={cn(
              'flex items-center text-neutral-500 border-r border-neutral-300 bg-neutral-50',
              addonSizeClasses[size],
              'self-stretch',
            )}
          >
            {prefix}
          </span>
        )}
        <input
          id={inputId}
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
              'flex items-center text-neutral-500 border-l border-neutral-300 bg-neutral-50',
              addonSizeClasses[size],
              'self-stretch',
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-xs text-danger">{errorMessage}</p>
      )}
    </div>
  )
}
