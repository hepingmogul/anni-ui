import { useState, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../utils/cn'
import type { InputNumberProps } from './InputNumber.types'

const sizeClasses = {
  sm: 'h-7 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-11 text-base',
}

const btnSizeClasses = {
  sm: 'w-6 text-xs',
  md: 'w-8 text-sm',
  lg: 'w-10 text-base',
}

const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
}

function formatValue(val: number, precision?: number): string {
  if (precision !== undefined) {
    return val.toFixed(precision)
  }
  return String(val)
}

function clamp(val: number, min?: number, max?: number): number {
  if (min !== undefined && val < min) return min
  if (max !== undefined && val > max) return max
  return val
}

export function InputNumber({
  min,
  max,
  step = 1,
  precision,
  size = 'md',
  disabled = false,
  placeholder,
  value,
  defaultValue,
  onChange,
  className,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: InputNumberProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<number | null>(
    defaultValue !== undefined ? defaultValue : null,
  )
  const [inputStr, setInputStr] = useState<string>(
    defaultValue !== undefined ? formatValue(defaultValue, precision) : '',
  )
  const isFocused = useRef(false)

  const currentValue = isControlled ? value : internalValue

  const displayStr = isFocused.current
    ? inputStr
    : currentValue !== null && currentValue !== undefined
      ? formatValue(currentValue, precision)
      : ''

  const isError = ariaInvalid === true || ariaInvalid === 'true'

  const updateValue = (newVal: number | null) => {
    if (!isControlled) {
      setInternalValue(newVal)
    }
    onChange?.(newVal)
  }

  const handleStep = (direction: 1 | -1) => {
    const base = currentValue ?? 0
    let next = base + direction * step
    next = clamp(next, min, max)
    if (precision !== undefined) {
      next = parseFloat(next.toFixed(precision))
    }
    setInputStr(formatValue(next, precision))
    updateValue(next)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStr(e.target.value)
  }

  const handleFocus = () => {
    isFocused.current = true
    setInputStr(
      currentValue !== null && currentValue !== undefined
        ? formatValue(currentValue, precision)
        : '',
    )
  }

  const handleBlur = () => {
    isFocused.current = false
    const parsed = parseFloat(inputStr)
    if (inputStr === '' || isNaN(parsed)) {
      setInputStr('')
      updateValue(null)
    } else {
      const clamped = clamp(parsed, min, max)
      const final =
        precision !== undefined ? parseFloat(clamped.toFixed(precision)) : clamped
      setInputStr(formatValue(final, precision))
      updateValue(final)
    }
  }

  const canDecrement = !disabled && (min === undefined || (currentValue ?? 0) > min)
  const canIncrement = !disabled && (max === undefined || (currentValue ?? 0) < max)

  return (
    <div
      className={cn(
        'flex items-center rounded-md border bg-surface transition-colors overflow-hidden',
        isError
          ? 'border-danger focus-within:ring-2 focus-within:ring-danger focus-within:ring-offset-1'
          : 'border-neutral-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-ring focus-within:ring-offset-1',
        disabled && 'bg-neutral-50 cursor-not-allowed opacity-60',
        className,
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        disabled={!canDecrement}
        onClick={() => handleStep(-1)}
        className={cn(
          'flex items-center justify-center border-r border-neutral-300 bg-neutral-50 text-neutral-500 transition-colors self-stretch',
          'hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed',
          btnSizeClasses[size],
        )}
      >
        <Minus size={iconSizeMap[size]} />
      </button>

      <input
        id={id}
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        disabled={disabled}
        value={displayStr}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          'flex-1 min-w-0 bg-transparent outline-none text-center text-neutral-900 placeholder:text-neutral-400',
          'disabled:cursor-not-allowed',
          sizeClasses[size],
          'px-2',
        )}
      />

      <button
        type="button"
        tabIndex={-1}
        disabled={!canIncrement}
        onClick={() => handleStep(1)}
        className={cn(
          'flex items-center justify-center border-l border-neutral-300 bg-neutral-50 text-neutral-500 transition-colors self-stretch',
          'hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed',
          btnSizeClasses[size],
        )}
      >
        <Plus size={iconSizeMap[size]} />
      </button>
    </div>
  )
}
