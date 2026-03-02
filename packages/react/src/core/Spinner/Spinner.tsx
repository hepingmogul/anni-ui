import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../utils/cn'
import type { SpinnerProps } from './Spinner.types'

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
}

const colorClasses = {
  default: 'text-neutral-500',
  white: 'text-white',
  primary: 'text-primary',
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
  neutral: 'text-neutral-500',
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', color = 'primary', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="加载中"
      className={cn('inline-flex items-center justify-center', colorClasses[color], className)}
      {...props}
    >
      <Loader2 size={sizeMap[size]} className="animate-spin" />
    </span>
  )
})
