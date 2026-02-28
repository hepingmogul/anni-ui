import type { ReactNode } from 'react'

export interface TabItem {
  key: string
  label: ReactNode
  children?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
  className?: string
}
