import { useState } from 'react'
import { cn } from '../utils/cn'
import type { TabsProps } from './Tabs.types'

export function Tabs({ items, activeKey, defaultActiveKey, onChange, className }: TabsProps) {
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items[0]?.key)

  const currentKey = activeKey ?? internalKey

  function handleClick(key: string) {
    if (activeKey === undefined) {
      setInternalKey(key)
    }
    onChange?.(key)
  }

  const activeItem = items.find((item) => item.key === currentKey)

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex border-b border-neutral-200">
        {items.map((item) => {
          const isActive = item.key === currentKey
          return (
            <button
              key={item.key}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleClick(item.key)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
                item.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {activeItem?.children !== undefined && (
        <div className="pt-4">{activeItem.children}</div>
      )}
    </div>
  )
}
