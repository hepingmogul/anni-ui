import type { ReactNode } from 'react'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  size?: SwitchSize
  disabled?: boolean
  label?: ReactNode
  checkedLabel?: ReactNode
  uncheckedLabel?: ReactNode
  className?: string
  id?: string
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  'aria-describedby'?: string
}
