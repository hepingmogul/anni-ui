import { Search } from 'lucide-react'
import { Input, Space } from '../index'

export default function InputPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Input 输入框</h1>
      <p className="text-sm text-neutral-500 mb-8">基础的输入框组件，支持标签、前缀、错误状态。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input placeholder="请输入内容" />
          <Input label="用户名" placeholder="请输入用户名" />
          <Input label="密码" type="password" placeholder="请输入密码" />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">前缀图标</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input
            label="搜索"
            placeholder="输入关键词"
            prefix={<Search size={14} />}
          />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">错误状态</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input
            label="邮箱"
            placeholder="example@mail.com"
            error
            errorMessage="请输入有效的邮箱地址"
          />
          <Input
            label="手机号"
            placeholder="请输入手机号"
            error
            errorMessage="手机号格式不正确"
          />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <Space direction="vertical" size="md" className="w-full max-w-sm">
          <Input label="禁用输入框" placeholder="不可编辑" disabled />
        </Space>
      </section>
    </div>
  )
}
