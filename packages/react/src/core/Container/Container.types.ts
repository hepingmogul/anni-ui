import type { CSSProperties, ReactNode } from 'react'

export interface ContainerProps {
  direction?: 'horizontal' | 'vertical'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface HeaderProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface AsideProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface MainProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface FooterProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
