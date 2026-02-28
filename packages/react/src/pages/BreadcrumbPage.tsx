import { Breadcrumb, Space } from '../index'

export default function BreadcrumbPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Breadcrumb 面包屑</h1>
      <p className="text-sm text-neutral-500 mb-8">显示当前页面在系统层级中的位置，并能向上返回。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Breadcrumb
          items={[
            { label: '首页', href: '/' },
            { label: '组件库', href: '/components' },
            { label: 'Breadcrumb' },
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">更多层级</h2>
        <Space direction="vertical" size="md">
          <Breadcrumb
            items={[
              { label: '首页', href: '/' },
              { label: '文档', href: '/docs' },
              { label: '组件', href: '/docs/components' },
              { label: '导航', href: '/docs/components/nav' },
              { label: 'Breadcrumb' },
            ]}
          />
        </Space>
      </section>
    </div>
  )
}
