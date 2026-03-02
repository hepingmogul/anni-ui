import { useState } from 'react'
import { Radio, RadioGroup, Space } from '../index'

export default function RadioPage() {
  const [value, setValue] = useState<string | number>('b')

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Radio 单选框</h1>
      <p className="text-sm text-neutral-500 mb-8">自定义外观的单选框，支持组合容器与 options 配置。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法（RadioGroup）</h2>
        <RadioGroup
          defaultValue="a"
          options={[
            { label: '选项 A', value: 'a' },
            { label: '选项 B', value: 'b' },
            { label: '选项 C', value: 'c' },
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控用法</h2>
        <Space direction="vertical" size="md">
          <RadioGroup
            value={value}
            onChange={setValue}
            options={[
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '橙子', value: 'orange' },
            ]}
          />
          <p className="text-sm text-neutral-500">当前选中：{value}</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">垂直方向</h2>
        <RadioGroup
          defaultValue="1"
          direction="vertical"
          options={[
            { label: '方案一：标准版', value: '1' },
            { label: '方案二：专业版', value: '2' },
            { label: '方案三：企业版', value: '3' },
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">children 用法</h2>
        <RadioGroup defaultValue="x" name="demo-children">
          <Radio value="x" label="自定义 X" />
          <Radio value="y" label="自定义 Y" />
          <Radio value="z" label="自定义 Z（禁用）" disabled />
        </RadioGroup>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space direction="vertical" size="md">
          <RadioGroup
            defaultValue="a"
            disabled
            options={[
              { label: '禁用选项 A', value: 'a' },
              { label: '禁用选项 B', value: 'b' },
            ]}
          />
          <RadioGroup
            defaultValue="a"
            options={[
              { label: '可选', value: 'a' },
              { label: '单项禁用', value: 'b', disabled: true },
            ]}
          />
        </Space>
      </section>
    </div>
  )
}
