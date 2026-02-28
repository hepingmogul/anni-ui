import type { HTMLAttributes, ReactNode } from 'react'

export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  direction?: SpaceDirection
  size?: SpaceSize
  wrap?: boolean
  align?: 'start' | 'center' | 'end' | 'baseline'
  children?: ReactNode
}
