import { Button, Space, Toast } from '../index'

export default function ToastPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Toast 消息提示</h1>
      <p className="text-sm text-neutral-500 mb-8">全局展示操作反馈信息，3 秒后自动消失。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">消息类型</h2>
        <Space wrap size="sm">
          <Button onClick={() => Toast.success('操作成功！')}>Success</Button>
          <Button variant="danger" onClick={() => Toast.error('发生错误！')}>Error</Button>
          <Button variant="secondary" onClick={() => Toast.warning('请注意！')}>Warning</Button>
          <Button variant="ghost" onClick={() => Toast.info('这是一条提示')}>Info</Button>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">自定义内容</h2>
        <Space wrap size="sm">
          <Button
            variant="secondary"
            onClick={() => Toast.success('文件已保存到本地磁盘')}
          >
            长文字提示
          </Button>
          <Button
            variant="secondary"
            onClick={() => Toast.info('正在加载数据，请稍候...')}
          >
            加载提示
          </Button>
        </Space>
      </section>
    </div>
  )
}
