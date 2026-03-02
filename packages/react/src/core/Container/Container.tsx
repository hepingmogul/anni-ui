import React from 'react'
import { cn } from '../utils/cn'
import type { ContainerProps } from './Container.types'
import { Footer } from './Footer'
import { Header } from './Header'

export const Container = ({ direction, className, style, children }: ContainerProps) => {
  const isVertical =
    direction === 'vertical' ||
    (direction === undefined &&
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type === Header || child.type === Footer),
      ))

  return (
    <div
      className={cn(
        'flex flex-1 basis-auto min-w-0 box-border',
        isVertical ? 'flex-col' : 'flex-row',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
