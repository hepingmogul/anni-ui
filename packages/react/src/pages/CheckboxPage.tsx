import { useState } from 'react'
import { Checkbox, Space } from '../index'

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Checkbox 复选框</h1>
      <p className="text-sm text-neutral-500 mb-8">用于在一组选项中进行多项选择。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="sm">
          <Checkbox label="未选中" />
          <Checkbox label="默认选中" defaultChecked />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控用法</h2>
        <Space direction="vertical" size="sm">
          <Checkbox
            label={`受控状态：${checked ? '已选中' : '未选中'}`}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">半选状态</h2>
        <Space direction="vertical" size="sm">
          <Checkbox label="半选（indeterminate）" indeterminate />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space direction="vertical" size="sm">
          <Checkbox label="禁用未选中" disabled />
          <Checkbox label="禁用已选中" disabled defaultChecked />
        </Space>
      </section>
    </div>
  )
}
