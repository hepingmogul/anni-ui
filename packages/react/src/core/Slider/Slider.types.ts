import type { ReactNode, Ref } from 'react'

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onChange?: (value: number | [number, number]) => void
  range?: boolean
  showTooltip?: boolean
  marks?: Record<number, ReactNode>
  disabled?: boolean
  className?: string
  id?: string
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  'aria-describedby'?: string
  ref?: Ref<HTMLDivElement>
}
