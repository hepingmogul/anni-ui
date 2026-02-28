import type { ReactNode } from 'react'

export interface CardProps {
  title?: ReactNode
  footer?: ReactNode
  bordered?: boolean
  hoverable?: boolean
  bodyClassName?: string
  children?: ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  id?: string
}

import type React from 'react'
