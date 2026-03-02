import { Search, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input, Space } from '../index'

export default function InputPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Input 输入框</h1>
      <p className="text-sm text-neutral-500 mb-8">基础输入框，专注输入 UI，错误状态由表单体系注入。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input placeholder="请输入内容" />
          <Input placeholder="请输入密码" type="password" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">前缀 / 后缀插槽</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input placeholder="搜索..." prefix={<Search size={14} />} />
          <Input
            placeholder="请输入密码"
            type={showPassword ? 'text' : 'password'}
            suffix={
              <button type="button" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            }
          />
          <Input placeholder="金额" prefix="¥" suffix="元" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">错误状态（aria-invalid）</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input placeholder="example@mail.com" aria-invalid="true" />
          <Input placeholder="请输入手机号" aria-invalid="true" prefix={<Search size={14} />} />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium（默认）" />
          <Input size="lg" placeholder="Large" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input placeholder="不可编辑" disabled />
        </Space>
      </section>
    </div>
  )
}
