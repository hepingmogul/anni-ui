import { useState } from 'react'
import { Checkbox, Space } from '../index'

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Checkbox 复选框</h1>
      <p className="text-sm text-neutral-500 mb-8">自定义外观的复选框，支持半选状态，错误色由 aria-invalid 驱动。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="sm">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm text-neutral-700">未选中</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-sm text-neutral-700">默认选中</span>
          </label>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控用法</h2>
        <label className="flex items-center gap-2">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm text-neutral-700">受控状态：{checked ? '已选中' : '未选中'}</span>
        </label>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">半选状态</h2>
        <label className="flex items-center gap-2">
          <Checkbox indeterminate />
          <span className="text-sm text-neutral-700">半选（indeterminate）</span>
        </label>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">错误状态（aria-invalid）</h2>
        <Space direction="vertical" size="sm">
          <label className="flex items-center gap-2">
            <Checkbox aria-invalid="true" />
            <span className="text-sm text-neutral-700">错误未选中</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox defaultChecked aria-invalid="true" />
            <span className="text-sm text-neutral-700">错误已选中</span>
          </label>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space direction="vertical" size="sm">
          <label className="flex items-center gap-2">
            <Checkbox disabled />
            <span className="text-sm text-neutral-400">禁用未选中</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox disabled defaultChecked />
            <span className="text-sm text-neutral-400">禁用已选中</span>
          </label>
        </Space>
      </section>
    </div>
  )
}
