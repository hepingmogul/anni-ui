import { Button, Space } from '../index'

export default function SpacePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Space 间距</h1>
      <p className="text-sm text-neutral-500 mb-8">设置组件之间的间距，支持水平、垂直方向及自动换行。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">水平排列（默认）</h2>
        <Space>
          <Button size="sm">A</Button>
          <Button size="sm" variant="secondary">B</Button>
          <Button size="sm" variant="ghost">C</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">垂直排列</h2>
        <Space direction="vertical" size="sm">
          <Button size="sm">第一行</Button>
          <Button size="sm" variant="secondary">第二行</Button>
          <Button size="sm" variant="ghost">第三行</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">间距尺寸</h2>
        <Space direction="vertical" size="md">
          <div>
            <p className="text-xs text-neutral-400 mb-2">xs</p>
            <Space size="xs">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Space>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-2">sm</p>
            <Space size="sm">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Space>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-2">md（默认）</p>
            <Space size="md">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Space>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-2">lg</p>
            <Space size="lg">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Space>
          </div>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">自动换行</h2>
        <Space wrap size="sm">
          {Array.from({ length: 12 }, (_, i) => (
            <Button key={i} size="sm" variant="secondary">按钮 {i + 1}</Button>
          ))}
        </Space>
      </section>
    </div>
  )
}
