import { Space, Tabs } from '../index'

export default function TabsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Tabs 标签页</h1>
      <p className="text-sm text-neutral-500 mb-8">选项卡切换组件，用于在不同内容区域之间切换。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <Tabs
          defaultActiveKey="tab1"
          items={[
            { key: 'tab1', label: '概览', children: <p className="text-sm text-neutral-700 pt-2">概览页面的内容区域。</p> },
            { key: 'tab2', label: '详情', children: <p className="text-sm text-neutral-700 pt-2">详情页面的内容区域。</p> },
            { key: 'tab3', label: '日志', children: <p className="text-sm text-neutral-700 pt-2">日志页面的内容区域。</p> },
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用标签</h2>
        <Tabs
          defaultActiveKey="tab1"
          items={[
            { key: 'tab1', label: '可用', children: <p className="text-sm text-neutral-700 pt-2">可用标签的内容。</p> },
            { key: 'tab2', label: '可用', children: <p className="text-sm text-neutral-700 pt-2">第二个标签的内容。</p> },
            { key: 'tab3', label: '已禁用', disabled: true },
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">更多标签</h2>
        <Tabs
          defaultActiveKey="home"
          items={[
            { key: 'home', label: '首页', children: <p className="text-sm text-neutral-700 pt-2">首页内容。</p> },
            { key: 'product', label: '产品', children: <p className="text-sm text-neutral-700 pt-2">产品内容。</p> },
            { key: 'pricing', label: '定价', children: <p className="text-sm text-neutral-700 pt-2">定价内容。</p> },
            { key: 'docs', label: '文档', children: <p className="text-sm text-neutral-700 pt-2">文档内容。</p> },
            { key: 'about', label: '关于', children: <p className="text-sm text-neutral-700 pt-2">关于内容。</p> },
          ]}
        />
      </section>
    </div>
  )
}
