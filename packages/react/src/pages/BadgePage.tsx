import { Bell } from 'lucide-react'
import { Badge, Button, Space } from '../index'

export default function BadgePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Badge 徽标</h1>
      <p className="text-sm text-neutral-500 mb-8">用于展示消息数量或状态的徽标组件。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">数字徽标</h2>
        <Space size="lg">
          <Badge count={5}>
            <Button variant="secondary" size="sm" icon={Bell}>通知</Button>
          </Badge>
          <Badge count={120} max={99}>
            <Button variant="secondary" size="sm">消息</Button>
          </Badge>
          <Badge count={0} showZero>
            <Button variant="secondary" size="sm">零值</Button>
          </Badge>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">小红点</h2>
        <Space size="lg">
          <Badge dot>
            <Button variant="secondary" size="sm">在线</Button>
          </Badge>
          <Badge dot>
            <Button variant="ghost" size="sm">消息</Button>
          </Badge>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">变体（Variant）</h2>
        <Space size="md" align="center">
          <Badge count={3} />
          <Badge variant="success" count={3} />
          <Badge variant="warning" count={3} />
          <Badge variant="danger" count={3} />
        </Space>
      </section>
    </div>
  )
}
