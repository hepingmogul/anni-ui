import { useEffect, useRef } from 'react'
import { cn } from '../utils/cn'
import type { CheckboxProps } from './Checkbox.types'

export function Checkbox({
  indeterminate = false,
  label,
  error = false,
  disabled,
  checked,
  className,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={cn(
          'h-4 w-4 rounded border-neutral-300 text-primary cursor-pointer',
          'focus:ring-2 focus:ring-primary-ring focus:ring-offset-1',
          error && 'border-danger',
          disabled && 'cursor-not-allowed',
          className,
        )}
        {...props}
      />
      {label && (
        <span className={cn('text-sm text-neutral-700', error && 'text-danger')}>
          {label}
        </span>
      )}
    </label>
  )
}
