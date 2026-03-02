import React, { forwardRef } from 'react'
import { cn } from '../utils/cn'
import type { AnchorProps, AnchorType, AnchorUnderline } from './Anchor.types'

const ALLOWED_PROTOCOLS = ['http:', 'https:']

function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin)
    return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? parsed.href : '#'
  } catch {
    return '#'
  }
}

const typeClasses: Record<AnchorType, string> = {
  default: 'text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary',
  primary: 'text-primary hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover',
  success: 'text-success hover:opacity-80 dark:text-success',
  warning: 'text-warning hover:opacity-80 dark:text-warning',
  danger: 'text-danger hover:opacity-80 dark:text-danger',
  info: 'text-info hover:opacity-80 dark:text-info',
}

const underlineClasses: Record<AnchorUnderline, string> = {
  always: 'underline',
  hover: 'no-underline hover:underline',
  never: 'no-underline',
}

const disabledClasses = 'opacity-50 cursor-not-allowed'

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(function Anchor(
  {
    type = 'default',
    underline = 'hover',
    disabled = false,
    href,
    target,
    icon: IconComponent,
    asChild = false,
    className,
    onClick,
    children,
    ...props
  },
  ref,
) {
  const anchorClasses = cn(
    'inline-flex items-center gap-1 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-1',
    typeClasses[type],
    !disabled && underlineClasses[underline],
    disabled && disabledClasses,
    className,
  )

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  const iconNode = IconComponent ? (
    <IconComponent aria-hidden="true" width="1em" height="1em" />
  ) : null

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string; tabIndex?: number }
    >

    const mergedChild = React.cloneElement(child, {
      className: cn(anchorClasses, child.props.className),
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        onClick?.(e)
        ;(child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>).onClick?.(e)
      },
      'aria-disabled': disabled ? true : undefined,
      tabIndex: disabled ? -1 : child.props.tabIndex,
    } as React.HTMLAttributes<HTMLAnchorElement>)

    if (iconNode) {
      return (
        <span className="inline-flex items-center gap-1">
          {iconNode}
          {mergedChild}
        </span>
      )
    }

    return mergedChild
  }

  const safeHref = href ? sanitizeUrl(href) : undefined
  const rel =
    target === '_blank'
      ? cn(typeof props.rel === 'string' ? props.rel : '', 'noopener noreferrer').trim()
      : props.rel

  return (
    <a
      ref={ref}
      href={safeHref}
      target={target}
      rel={rel}
      aria-disabled={disabled ? true : undefined}
      tabIndex={disabled ? -1 : props.tabIndex}
      className={anchorClasses}
      onClick={handleClick}
      {...props}
    >
      {iconNode}
      {children}
    </a>
  )
})
