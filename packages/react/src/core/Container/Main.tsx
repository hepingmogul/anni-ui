import { cn } from '../utils/cn'
import type { MainProps } from './Container.types'

export const Main = ({ className, style, children }: MainProps) => (
  <main
    className={cn('flex-1 basis-auto overflow-auto box-border p-5', className)}
    style={style}
  >
    {children}
  </main>
)
