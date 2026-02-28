import { Divider, Space } from '../index'

export default function DividerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Divider 分割线</h1>
      <p className="text-sm text-neutral-500 mb-8">区隔内容的分割线，支持横向、虚线及文字内容。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础分割线</h2>
        <p className="text-sm text-neutral-600 mb-2">上方内容</p>
        <Divider />
        <p className="text-sm text-neutral-600 mt-2">下方内容</p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">虚线</h2>
        <p className="text-sm text-neutral-600 mb-2">上方内容</p>
        <Divider dashed />
        <p className="text-sm text-neutral-600 mt-2">下方内容</p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">带文字</h2>
        <Space direction="vertical" size="md" className="w-full">
          <div>
            <p className="text-sm text-neutral-600 mb-2">分段标题示例</p>
            <Divider>按钮组</Divider>
            <p className="text-sm text-neutral-600 mt-2">以下是按钮相关内容</p>
          </div>
          <div>
            <Divider>数据展示</Divider>
          </div>
          <div>
            <Divider>导航</Divider>
          </div>
        </Space>
      </section>
    </div>
  )
}
