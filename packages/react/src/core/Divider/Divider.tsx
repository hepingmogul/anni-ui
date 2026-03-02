import { forwardRef } from 'react'
import { cn } from '../utils/cn'
import type { DividerProps } from './Divider.types'

const textAlignClasses = {
  left: 'before:flex-none before:w-4',
  center: '',
  right: 'after:flex-none after:w-4',
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    textAlign = 'center',
    dashed = false,
    children,
    className,
    ...props
  },
  ref,
) {
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-block self-stretch w-px bg-neutral-200 mx-2',
          dashed && 'border-l border-dashed border-neutral-200 bg-transparent',
          className,
        )}
        {...props}
      />
    )
  }

  if (children) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 my-4',
          textAlignClasses[textAlign],
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex-1 h-px bg-neutral-200',
            dashed && 'border-t border-dashed border-neutral-200 bg-transparent h-0',
          )}
        />
        <span className="text-sm text-neutral-500 whitespace-nowrap">{children}</span>
        <div
          className={cn(
            'flex-1 h-px bg-neutral-200',
            dashed && 'border-t border-dashed border-neutral-200 bg-transparent h-0',
          )}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'my-4 h-px bg-neutral-200',
        dashed && 'border-t border-dashed border-neutral-200 bg-transparent h-0',
        className,
      )}
      {...props}
    />
  )
})
