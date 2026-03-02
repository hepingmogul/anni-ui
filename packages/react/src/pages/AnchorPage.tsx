import { useState } from 'react'
import { ExternalLink, Pencil, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Anchor, Space } from '../index'

export default function AnchorPage() {
  const [clickLog, setClickLog] = useState<string[]>([])

  const logClick = (label: string) => {
    setClickLog((prev) => [`点击了「${label}」`, ...prev].slice(0, 5))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Anchor 链接</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        文字超链接，支持语义颜色、下划线控制、禁用态与路由集成。
      </p>

      {/* 基础用法 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">基础用法</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          六种语义类型，覆盖常见链接颜色需求。
        </p>
        <Space size="lg" wrap>
          <Anchor href="https://example.com" target="_blank" icon={ExternalLink}>
            default
          </Anchor>
          <Anchor type="primary" href="https://example.com" target="_blank">
            primary
          </Anchor>
          <Anchor type="success">success</Anchor>
          <Anchor type="warning">warning</Anchor>
          <Anchor type="danger">danger</Anchor>
          <Anchor type="info">info</Anchor>
        </Space>
      </section>

      {/* 禁用状态 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">禁用状态</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          禁用后鼠标变为 <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">not-allowed</code>，点击事件与 href 跳转均被阻止。
        </p>
        <Space size="lg" wrap>
          <Anchor disabled>default</Anchor>
          <Anchor type="primary" disabled>primary</Anchor>
          <Anchor type="success" disabled>success</Anchor>
          <Anchor type="warning" disabled>warning</Anchor>
          <Anchor type="danger" disabled>danger</Anchor>
          <Anchor type="info" disabled>info</Anchor>
        </Space>
      </section>

      {/* 下划线控制 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">下划线控制</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          通过 <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">underline</code> 控制下划线的显示时机。
        </p>
        <Space size="lg" wrap>
          <Anchor type="primary" underline="always">always（始终显示）</Anchor>
          <Anchor type="primary" underline="hover">hover（悬停显示，默认）</Anchor>
          <Anchor type="primary" underline="never">never（从不显示）</Anchor>
        </Space>
      </section>

      {/* 图标链接 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">图标链接</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          通过 <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">icon</code> prop 传入 SVG React 组件，图标与文字垂直居中对齐。
        </p>
        <Space size="lg" wrap>
          <Anchor type="primary" icon={Pencil}>编辑</Anchor>
          <Anchor type="info" icon={Info}>了解更多</Anchor>
          <Anchor type="primary" icon={ExternalLink} href="https://example.com" target="_blank">
            外部链接
          </Anchor>
          <Anchor type="danger" icon={Pencil} disabled>禁用编辑</Anchor>
        </Space>
      </section>

      {/* onClick 交互演示 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">onClick 事件</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          非禁用状态下触发 <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">onClick</code>，禁用状态下事件被拦截。
        </p>
        <Space size="lg" wrap className="mb-3">
          <Anchor type="primary" onClick={() => logClick('主要链接')}>
            点我触发事件
          </Anchor>
          <Anchor type="success" onClick={() => logClick('成功链接')}>
            成功操作
          </Anchor>
          <Anchor type="danger" disabled onClick={() => logClick('不会触发')}>
            禁用（不触发）
          </Anchor>
        </Space>
        {clickLog.length > 0 && (
          <div className="rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono space-y-0.5">
            {clickLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        )}
      </section>

      {/* asChild — 集成 react-router-dom */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          asChild — 集成 react-router-dom
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          使用{' '}
          <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">asChild</code>
          {' '}将 Anchor 样式委托给 react-router-dom{' '}
          <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">&lt;Link&gt;</code>
          ，保留客户端路由导航能力，避免全页刷新。
        </p>
        <Space size="lg" wrap>
          <Anchor asChild type="primary">
            <Link to="/">首页</Link>
          </Anchor>
          <Anchor asChild type="primary" underline="always">
            <Link to="/button">Button 组件</Link>
          </Anchor>
          <Anchor asChild type="primary" icon={Pencil}>
            <Link to="/input">Input 组件</Link>
          </Anchor>
          <Anchor asChild type="primary" disabled>
            <Link to="/settings">禁用链接</Link>
          </Anchor>
        </Space>
      </section>
    </div>
  )
}
