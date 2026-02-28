import { Space, Spinner } from '../index'

export default function SpinnerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Spinner 加载</h1>
      <p className="text-sm text-neutral-500 mb-8">用于页面和区块的加载中状态。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">尺寸（Size）</h2>
        <Space size="lg" align="center">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" />
            <span className="text-xs text-neutral-400">xs</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-neutral-400">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-neutral-400">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-neutral-400">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs text-neutral-400">xl</span>
          </div>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">颜色（Color）</h2>
        <Space size="lg" align="center">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="primary" />
            <span className="text-xs text-neutral-400">primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="success" />
            <span className="text-xs text-neutral-400">success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="warning" />
            <span className="text-xs text-neutral-400">warning</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="danger" />
            <span className="text-xs text-neutral-400">danger</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="neutral" />
            <span className="text-xs text-neutral-400">neutral</span>
          </div>
        </Space>
      </section>
    </div>
  )
}
