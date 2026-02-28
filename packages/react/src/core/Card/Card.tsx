import { cn } from '../utils/cn'
import type { CardProps } from './Card.types'

export function Card({
  title,
  footer,
  bordered = true,
  hoverable = false,
  bodyClassName,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-surface shadow-sm',
        bordered && 'border border-neutral-200',
        hoverable && 'transition-shadow hover:shadow-md cursor-pointer',
        className,
      )}
      {...props}
    >
      {title && (
        <div className="px-5 py-4 border-b border-neutral-100">
          {typeof title === 'string' ? (
            <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      <div className={cn('px-5 py-4', bodyClassName)}>{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50 rounded-b-lg text-sm text-neutral-700">
          {footer}
        </div>
      )}
    </div>
  )
}
