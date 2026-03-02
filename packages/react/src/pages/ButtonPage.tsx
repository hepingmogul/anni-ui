import { Search, Settings, Star, Trash, ExternalLink } from 'lucide-react'
import { Button, Space } from '../index'

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Button 按钮</h1>
      <p className="text-sm text-neutral-500 mb-8">常用的操作按钮，支持多种变体、尺寸、形态。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">变体（Variant）</h2>
        <Space wrap size="sm">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸（Size）</h2>
        <Space wrap size="sm" align="center">
          <Button size="xs">XSmall</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">XLarge</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">描边（Outline）</h2>
        <Space wrap size="sm">
          <Button variant="primary" outline>Primary</Button>
          <Button variant="secondary" outline>Secondary</Button>
          <Button variant="danger" outline>Danger</Button>
          <Button variant="primary" outline disabled>Disabled</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">纯文本（Plain）</h2>
        <Space wrap size="sm">
          <Button variant="primary" plain>Primary</Button>
          <Button variant="secondary" plain>Secondary</Button>
          <Button variant="danger" plain>Danger</Button>
          <Button variant="primary" plain icon={ExternalLink} iconPosition="right">了解更多</Button>
          <Button variant="primary" plain disabled>Disabled</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">圆角（Round）</h2>
        <Space wrap size="sm" align="center">
          <Button variant="primary" round>Primary Round</Button>
          <Button variant="secondary" round>Secondary Round</Button>
          <Button variant="primary" outline round>Outline Round</Button>
          <Button variant="danger" round size="sm">Small Round</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">圆形（Circle）</h2>
        <Space wrap size="sm" align="center">
          <Button variant="primary" circle icon={Search} size="xs" />
          <Button variant="primary" circle icon={Search} size="sm" />
          <Button variant="primary" circle icon={Search} size="md" />
          <Button variant="primary" circle icon={Search} size="lg" />
          <Button variant="primary" circle icon={Search} size="xl" />
          <Button variant="secondary" circle icon={Settings} />
          <Button variant="ghost" circle icon={Star} />
          <Button variant="danger" outline circle icon={Trash} />
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">块级（Block）</h2>
        <div className="w-80 flex flex-col gap-2">
          <Button variant="primary" block>登录</Button>
          <Button variant="secondary" outline block>取消</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">自定义标签（Tag）</h2>
        <Space wrap size="sm">
          <Button
            tag="a"
            {...({ href: 'https://github.com', target: '_blank', rel: 'noopener noreferrer' } as object)}
            variant="primary"
          >
            外链跳转
          </Button>
          <Button
            tag="a"
            {...({ href: 'https://github.com', target: '_blank', rel: 'noopener noreferrer' } as object)}
            variant="primary"
            outline
          >
            描边链接
          </Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">图标（Icon）</h2>
        <Space wrap size="sm">
          <Button variant="primary" icon={Search} size="sm">搜索</Button>
          <Button variant="secondary" icon={Search}>搜索</Button>
          <Button variant="primary" icon={ExternalLink} iconPosition="right">更多</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">加载中（Loading）</h2>
        <Space wrap size="sm">
          <Button variant="primary" loading>加载中</Button>
          <Button variant="secondary" loading>加载中</Button>
          <Button variant="primary" outline loading>加载中</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用（Disabled）</h2>
        <Space wrap size="sm">
          <Button variant="primary" disabled>禁用</Button>
          <Button variant="secondary" disabled>禁用</Button>
          <Button variant="ghost" disabled>禁用</Button>
          <Button variant="danger" disabled>禁用</Button>
          <Button variant="primary" outline disabled>禁用</Button>
          <Button variant="primary" plain disabled>禁用</Button>
        </Space>
      </section>
    </div>
  )
}
