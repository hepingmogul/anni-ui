import type { ReactNode } from 'react'

export interface RadioProps {
  value: string | number
  checked?: boolean
  disabled?: boolean
  label?: ReactNode
  className?: string
  onChange?: (value: string | number) => void
  name?: string
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
}

export interface RadioOption {
  label: ReactNode
  value: string | number
  disabled?: boolean
}

export interface RadioGroupProps {
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  options?: RadioOption[]
  children?: ReactNode
  className?: string
  name?: string
  id?: string
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  'aria-describedby'?: string
}
