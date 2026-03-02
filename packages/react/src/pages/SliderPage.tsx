import { useState } from 'react'
import { Slider, Space } from '../index'

export default function SliderPage() {
  const [single, setSingle] = useState(30)
  const [range, setRange] = useState<[number, number]>([20, 70])

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Slider 滑块</h1>
      <p className="text-sm text-neutral-500 mb-8">在连续区间内选取数值，支持单滑块与范围双滑块。</p>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">基础用法</h2>
        <div className="max-w-md">
          <Slider defaultValue={40} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">受控单滑块</h2>
        <Space direction="vertical" size="md" className="max-w-md">
          <Slider value={single} onChange={(v) => setSingle(v as number)} />
          <p className="text-sm text-neutral-500">当前值：{single}</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">范围双滑块</h2>
        <Space direction="vertical" size="md" className="max-w-md">
          <Slider range value={range} onChange={(v) => setRange(v as [number, number])} />
          <p className="text-sm text-neutral-500">范围：{range[0]} ~ {range[1]}</p>
        </Space>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">步进值</h2>
        <div className="max-w-md">
          <Slider defaultValue={0} step={10} />
          <p className="text-xs text-neutral-400 mt-2">step=10</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">刻度标记</h2>
        <div className="max-w-md">
          <Slider
            defaultValue={0}
            step={25}
            marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">禁用状态</h2>
        <div className="max-w-md">
          <Slider defaultValue={60} disabled />
        </div>
      </section>
    </div>
  )
}
