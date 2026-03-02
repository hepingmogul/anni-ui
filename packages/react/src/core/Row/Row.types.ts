import type { HTMLAttributes, ReactNode, ElementType } from 'react'

export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export interface RowProps extends HTMLAttributes<HTMLElement> {
  gutter?: number | [number, number]
  justify?: RowJustify
  align?: RowAlign
  wrap?: boolean
  tag?: ElementType
  children?: ReactNode
}

export interface ColResponsiveProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
}

export interface ColProps extends HTMLAttributes<HTMLElement> {
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | ColResponsiveProps
  sm?: number | ColResponsiveProps
  md?: number | ColResponsiveProps
  lg?: number | ColResponsiveProps
  xl?: number | ColResponsiveProps
  xxl?: number | ColResponsiveProps
  tag?: ElementType
  children?: ReactNode
}
