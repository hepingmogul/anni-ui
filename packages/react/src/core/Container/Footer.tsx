import { cn } from '../utils/cn'
import type { FooterProps } from './Container.types'

export const Footer = ({ className, style, children }: FooterProps) => (
  <footer
    className={cn('flex items-center shrink-0 box-border px-5', 'dark:bg-neutral-800', className)}
    style={style}
  >
    {children}
  </footer>
)
