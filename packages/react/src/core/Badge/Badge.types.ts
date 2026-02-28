import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  count?: number
  dot?: boolean
  max?: number
  children?: ReactNode
  showZero?: boolean
}
