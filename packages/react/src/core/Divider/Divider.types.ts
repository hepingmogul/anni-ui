import type { HTMLAttributes, ReactNode } from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerTextAlign = 'left' | 'center' | 'right'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation
  textAlign?: DividerTextAlign
  dashed?: boolean
  children?: ReactNode
}
