import type React from 'react'

export type AnchorType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AnchorUnderline = 'always' | 'hover' | 'never'
export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top'

export interface AnchorProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  type?: AnchorType
  underline?: AnchorUnderline
  disabled?: boolean
  href?: string
  target?: AnchorTarget
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /**
   * 为 true 时不渲染 <a> 标签，将样式类与交互 props 合并到唯一子元素上。
   * 适用于集成 react-router-dom <Link> 等第三方路由组件。
   */
  asChild?: boolean
  className?: string
  children?: React.ReactNode
}
