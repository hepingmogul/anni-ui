import type { Ref } from 'react'

export type InputNumberSize = 'sm' | 'md' | 'lg'

export interface InputNumberProps {
  min?: number
  max?: number
  step?: number
  precision?: number
  size?: InputNumberSize
  disabled?: boolean
  placeholder?: string
  value?: number | null
  defaultValue?: number
  onChange?: (value: number | null) => void
  className?: string
  id?: string
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  'aria-describedby'?: string
  ref?: Ref<HTMLInputElement>
}
