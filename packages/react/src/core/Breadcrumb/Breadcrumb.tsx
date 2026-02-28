import { ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'
import type { BreadcrumbProps } from './Breadcrumb.types'

export function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const defaultSeparator = <ChevronRight size={14} className="text-neutral-400" />

  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center', className)} {...props}>
      <ol className="flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {isLast ? (
                <span className="text-sm text-neutral-700 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-sm text-primary hover:text-primary-active hover:underline transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="text-sm text-primary hover:text-primary-active transition-colors"
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span className="flex items-center">
                  {separator ?? defaultSeparator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
