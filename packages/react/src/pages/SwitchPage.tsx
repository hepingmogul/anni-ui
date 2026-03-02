import { useState } from 'react'
import { Switch, Space } from '../index'

export default function SwitchPage() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Switch 开关</h1>
      <p className="text-sm text-neutral-500 mb-8">表示二元状态（开/关）的开关控件，使用 role="switch"。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="md">
          <Switch />
          <Switch defaultChecked />
          <Switch label="开启通知" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控用法</h2>
        <Space direction="vertical" size="md">
          <Switch checked={checked} onChange={setChecked} label={`当前：${checked ? '开' : '关'}`} />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">轨道内文字</h2>
        <Space direction="vertical" size="md">
          <Switch checkedLabel="开" uncheckedLabel="关" size="lg" />
          <Switch checkedLabel="ON" uncheckedLabel="OFF" size="lg" defaultChecked />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸</h2>
        <Space size="lg">
          <Switch size="sm" label="Small" />
          <Switch size="md" label="Medium" />
          <Switch size="lg" label="Large" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space size="lg">
          <Switch disabled label="禁用关闭" />
          <Switch disabled defaultChecked label="禁用开启" />
        </Space>
      </section>
    </div>
  )
}
