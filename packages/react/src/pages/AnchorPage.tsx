import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Anchor, Space } from '../index'

export default function AnchorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Anchor 链接</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">文字超链接，支持语义颜色、下划线控制、禁用态与路由集成。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">基础用法</h2>
        <Space size="lg">
          <Anchor href="https://example.com" target="_blank">default</Anchor>
          <Anchor type="primary" href="https://example.com" target="_blank">primary</Anchor>
          <Anchor type="success">success</Anchor>
          <Anchor type="warning">warning</Anchor>
          <Anchor type="danger">danger</Anchor>
          <Anchor type="info">info</Anchor>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">禁用状态</h2>
        <Space size="lg">
          <Anchor disabled>default</Anchor>
          <Anchor type="primary" disabled>primary</Anchor>
          <Anchor type="success" disabled>success</Anchor>
          <Anchor type="warning" disabled>warning</Anchor>
          <Anchor type="danger" disabled>danger</Anchor>
          <Anchor type="info" disabled>info</Anchor>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">下划线控制</h2>
        <Space size="lg">
          <Anchor type="primary" underline="always">always</Anchor>
          <Anchor type="primary" underline="hover">hover（默认）</Anchor>
          <Anchor type="primary" underline="never">never</Anchor>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">图标链接</h2>
        <Space size="lg">
          <Anchor type="primary" icon={Pencil}>编辑</Anchor>
          <Anchor type="danger" icon={Pencil} disabled>禁用编辑</Anchor>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">asChild — 集成 react-router-dom</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          使用 <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">asChild</code> 将 Anchor 样式委托给 react-router-dom <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">&lt;Link&gt;</code>，保留客户端路由导航能力。
        </p>
        <Space size="lg">
          <Anchor asChild type="primary">
            <Link to="/">首页</Link>
          </Anchor>
          <Anchor asChild type="primary" underline="always">
            <Link to="/button">Button 组件</Link>
          </Anchor>
          <Anchor asChild type="primary" disabled>
            <Link to="/button">禁用链接</Link>
          </Anchor>
          <Anchor asChild type="primary" icon={Pencil}>
            <Link to="/input">Input 组件</Link>
          </Anchor>
        </Space>
      </section>
    </div>
  )
}
