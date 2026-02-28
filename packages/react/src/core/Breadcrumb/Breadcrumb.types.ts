import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
  onClick?: (e: MouseEvent) => void
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: ReactNode
}
