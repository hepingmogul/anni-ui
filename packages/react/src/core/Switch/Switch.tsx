import { useState, forwardRef } from 'react'
import { cn } from '../utils/cn'
import type { SwitchProps } from './Switch.types'

const trackSizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
}

const thumbSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

const thumbTranslateClasses = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-7',
}

const labelTextSizeClasses = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-xs',
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked = false,
    onChange,
    size = 'md',
    disabled = false,
    label,
    checkedLabel,
    uncheckedLabel,
    className,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  },
  ref,
) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = isControlled ? checked : internalChecked

  const handleClick = () => {
    if (disabled) return
    const next = !isChecked
    if (!isControlled) {
      setInternalChecked(next)
    }
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          trackSizeClasses[size],
          isChecked ? 'bg-primary' : 'bg-neutral-300',
        )}
      >
        {(checkedLabel || uncheckedLabel) && (
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none text-white font-medium',
              labelTextSizeClasses[size],
              isChecked ? 'pl-1' : 'pr-1',
            )}
          >
            {isChecked ? checkedLabel : uncheckedLabel}
          </span>
        )}
        <span
          className={cn(
            'rounded-full bg-white shadow-sm transition-transform duration-200',
            thumbSizeClasses[size],
            isChecked ? thumbTranslateClasses[size] : 'translate-x-0',
          )}
        />
      </button>
      {label && (
        <span className="text-sm text-neutral-700 select-none">{label}</span>
      )}
    </span>
  )
})
