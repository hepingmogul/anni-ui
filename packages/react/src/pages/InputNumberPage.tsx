import { useState } from 'react'
import { InputNumber, Space } from '../index'

export default function InputNumberPage() {
  const [value, setValue] = useState<number | null>(10)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">InputNumber 数字输入框</h1>
      <p className="text-sm text-neutral-500 mb-8">在输入框基础上增加步进按钮与数值范围限制。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="md" className="w-full max-w-xs">
          <InputNumber placeholder="请输入数字" />
          <InputNumber defaultValue={5} />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控用法</h2>
        <Space direction="vertical" size="md" className="w-full max-w-xs">
          <InputNumber value={value} onChange={setValue} min={0} max={100} />
          <p className="text-sm text-neutral-500">当前值：{value ?? '—'}</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">范围限制</h2>
        <Space direction="vertical" size="md" className="w-full max-w-xs">
          <InputNumber min={1} max={10} defaultValue={5} />
          <p className="text-xs text-neutral-400">min=1, max=10，达到边界按钮自动禁用</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">步进值</h2>
        <Space direction="vertical" size="md" className="w-full max-w-xs">
          <InputNumber step={5} defaultValue={0} />
          <p className="text-xs text-neutral-400">step=5</p>
          <InputNumber step={0.1} precision={1} defaultValue={0} />
          <p className="text-xs text-neutral-400">step=0.1, precision=1</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸</h2>
        <Space direction="vertical" size="md" className="w-full max-w-xs">
          <InputNumber size="sm" defaultValue={0} />
          <InputNumber size="md" defaultValue={0} />
          <InputNumber size="lg" defaultValue={0} />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <InputNumber defaultValue={42} disabled className="max-w-xs" />
      </section>
    </div>
  )
}
