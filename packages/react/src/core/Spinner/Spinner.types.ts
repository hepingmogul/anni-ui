import type { HTMLAttributes } from 'react'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerColor = 'default' | 'white' | 'primary' | 'success' | 'danger'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  color?: SpinnerColor
}
