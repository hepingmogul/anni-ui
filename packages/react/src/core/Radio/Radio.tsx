import { createContext, useContext, useState } from 'react'
import { cn } from '../utils/cn'
import type { RadioProps, RadioGroupProps, RadioOption } from './Radio.types'

// ─── RadioGroup Context ──────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value?: string | number
  onChange?: (value: string | number) => void
  disabled?: boolean
  name?: string
  isError?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

// ─── Radio ───────────────────────────────────────────────────────────────────

export function Radio({
  value,
  checked,
  disabled: propDisabled,
  label,
  className,
  onChange,
  name,
  'aria-invalid': ariaInvalid,
}: RadioProps) {
  const ctx = useContext(RadioGroupContext)
  const isGrouped = ctx.onChange !== undefined || ctx.value !== undefined

  const isChecked = isGrouped ? ctx.value === value : checked
  const isDisabled = propDisabled || ctx.disabled
  const groupName = name ?? ctx.name
  const isError = ariaInvalid === true || ariaInvalid === 'true' || ctx.isError

  const handleChange = () => {
    if (isDisabled) return
    if (isGrouped) {
      ctx.onChange?.(value)
    } else {
      onChange?.(value)
    }
  }

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        isDisabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <input
        type="radio"
        name={groupName}
        value={String(value)}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        className="sr-only peer"
      />
      <span
        role="radio"
        aria-checked={isChecked}
        className={cn(
          'h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-ring peer-focus-visible:ring-offset-1',
          isError
            ? isChecked
              ? 'border-danger bg-surface'
              : 'border-danger bg-surface'
            : isChecked
              ? 'border-primary bg-surface'
              : 'border-neutral-300 bg-surface',
        )}
      >
        {isChecked && (
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              isError ? 'bg-danger' : 'bg-primary',
            )}
          />
        )}
      </span>
      {label && (
        <span className="text-sm text-neutral-700">{label}</span>
      )}
    </label>
  )
}

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  direction = 'horizontal',
  disabled = false,
  options,
  children,
  className,
  name,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: RadioGroupProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue)
  const currentValue = isControlled ? value : internalValue
  const isError = ariaInvalid === true || ariaInvalid === 'true'

  const handleChange = (val: string | number) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onChange: handleChange, disabled, name, isError }}
    >
      <div
        id={id}
        role="radiogroup"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        className={cn(
          'flex gap-4',
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className,
        )}
      >
        {options
          ? options.map((opt: RadioOption) => (
              <Radio
                key={String(opt.value)}
                value={opt.value}
                label={opt.label}
                disabled={opt.disabled}
              />
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  )
}
