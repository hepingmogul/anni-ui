import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'info'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  outline?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  block?: boolean
  tag?: ElementType
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  children?: ReactNode
}
