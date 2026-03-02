import { cn } from '../utils/cn'
import type { HeaderProps } from './Container.types'

export const Header = ({ className, style, children }: HeaderProps) => (
  <header
    className={cn('flex items-center shrink-0 box-border px-5', 'dark:bg-neutral-800', className)}
    style={style}
  >
    {children}
  </header>
)
