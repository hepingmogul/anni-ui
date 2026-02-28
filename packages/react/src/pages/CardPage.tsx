import { Button, Card, Space } from '../index'

export default function CardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Card 卡片</h1>
      <p className="text-sm text-neutral-500 mb-8">通用的内容容器，支持标题、底部、悬停效果。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础卡片</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card title="基础卡片">
            <p className="text-sm text-neutral-700">这是卡片的内容区域，可以放置任意内容。</p>
          </Card>
          <Card>
            <p className="text-sm text-neutral-700">无标题卡片，仅有内容区域。</p>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">带底部操作</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card
            title="带底部"
            footer={<span className="text-sm text-neutral-500">更新于 2026-02-28</span>}
          >
            <p className="text-sm text-neutral-700">底部可以放置操作按钮或说明文字。</p>
          </Card>
          <Card
            title="操作按钮"
            footer={
              <Space size="sm">
                <Button size="sm" variant="secondary">取消</Button>
                <Button size="sm" variant="primary">确认</Button>
              </Space>
            }
          >
            <p className="text-sm text-neutral-700">底部放置操作按钮组合。</p>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">悬停效果</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card title="悬停阴影" hoverable>
            <p className="text-sm text-neutral-700">鼠标悬停时显示阴影效果。</p>
          </Card>
          <Card
            title="悬停 + 底部"
            footer={<span className="text-sm text-neutral-500">点击查看详情</span>}
            hoverable
          >
            <p className="text-sm text-neutral-700">结合悬停与底部操作区域。</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
