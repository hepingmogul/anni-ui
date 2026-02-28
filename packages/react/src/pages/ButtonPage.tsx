import { Search } from 'lucide-react'
import { Button, Space } from '../index'

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Button 按钮</h1>
      <p className="text-sm text-neutral-500 mb-8">常用的操作按钮，支持多种变体、尺寸、状态。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">变体（Variant）</h2>
        <Space wrap size="sm">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸（Size）</h2>
        <Space wrap size="sm" align="center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">图标（Icon）</h2>
        <Space wrap size="sm">
          <Button variant="primary" icon={Search} size="sm">搜索</Button>
          <Button variant="secondary" icon={Search}>搜索</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">加载中（Loading）</h2>
        <Space wrap size="sm">
          <Button variant="primary" loading>加载中</Button>
          <Button variant="secondary" loading>加载中</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用（Disabled）</h2>
        <Space wrap size="sm">
          <Button variant="primary" disabled>禁用</Button>
          <Button variant="secondary" disabled>禁用</Button>
          <Button variant="ghost" disabled>禁用</Button>
          <Button variant="danger" disabled>禁用</Button>
        </Space>
      </section>
    </div>
  )
}
