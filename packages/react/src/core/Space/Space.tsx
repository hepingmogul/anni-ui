import { cn } from '../utils/cn'
import type { SpaceProps, SpaceSize } from './Space.types'

const gapClasses: Record<string, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
}

function resolveGap(size: SpaceSize): { className?: string; style?: React.CSSProperties } {
  if (typeof size === 'number') {
    return { style: { gap: size } }
  }
  return { className: gapClasses[size] }
}

import type React from 'react'

export function Space({
  direction = 'horizontal',
  size = 'md',
  wrap = false,
  align = 'center',
  children,
  className,
  style,
  ...props
}: SpaceProps) {
  const { className: gapClass, style: gapStyle } = resolveGap(size)

  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        wrap && 'flex-wrap',
        alignClasses[align],
        gapClass,
        className,
      )}
      style={{ ...gapStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
