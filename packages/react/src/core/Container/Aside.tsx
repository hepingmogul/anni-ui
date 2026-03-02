import { cn } from '../utils/cn'
import type { AsideProps } from './Container.types'

export const Aside = ({ className, style, children }: AsideProps) => (
  <aside
    className={cn('flex flex-col shrink-0 box-border overflow-auto', 'dark:bg-neutral-800', className)}
    style={style}
  >
    {children}
  </aside>
)
