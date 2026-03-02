import { Row, Col } from '../index'

const block = 'rounded min-h-9 flex items-center justify-center text-xs font-medium'

const COLORS = [
  'bg-primary-light text-primary-hover',
  'bg-info-light text-info-fg',
  'bg-success-light text-success-fg',
  'bg-warning-light text-warning-fg',
  'bg-danger-light text-danger-hover',
] as const

function colorClass(index: number) {
  return `${block} ${COLORS[index % COLORS.length]}`
}

export default function GridPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Row / Col 栅格系统
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        基于 24 列的 Flex 栅格，支持间距、偏移、响应式断点及嵌套。
      </p>

      {/* 1. 基础布局 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          基础布局
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          通过 <code>span</code> 属性设置列数（满行为 24），可组合出 1 / 2 / 3 / 4 / 6 等均分布局。
        </p>
        <div className="space-y-2">
          <Row><Col span={24}><div className={colorClass(0)}>span=24</div></Col></Row>
          <Row>
            {[12, 12].map((s, i) => (
              <Col key={i} span={s}><div className={colorClass(i)}>span={s}</div></Col>
            ))}
          </Row>
          <Row>
            {[8, 8, 8].map((s, i) => (
              <Col key={i} span={s}><div className={colorClass(i)}>span={s}</div></Col>
            ))}
          </Row>
          <Row>
            {[6, 6, 6, 6].map((s, i) => (
              <Col key={i} span={s}><div className={colorClass(i)}>span={s}</div></Col>
            ))}
          </Row>
          <Row>
            {Array.from({ length: 6 }, (_, i) => (
              <Col key={i} span={4}>
                <div className={colorClass(i)}>span=4</div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 2. 分栏间隔 Gutter */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          分栏间隔
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          <code>gutter</code> 传数字设置水平间距；传 <code>[水平, 垂直]</code> 同时设置换行场景的行间距。
        </p>
        <p className="text-xs text-neutral-500 mb-2">gutter=16（水平间距）</p>
        <Row gutter={16} className="mb-4">
          {[0, 1, 2, 3].map((i) => (
            <Col key={i} span={6}>
              <div className={colorClass(i)}>span=6</div>
            </Col>
          ))}
        </Row>
        <p className="text-xs text-neutral-500 mb-2">gutter=[16, 8]（水平 + 垂直）</p>
        <Row gutter={[16, 8]}>
          {Array.from({ length: 6 }, (_, i) => (
            <Col key={i} span={8}>
              <div className={colorClass(i)}>span=8</div>
            </Col>
          ))}
        </Row>
      </section>

      {/* 3. 混合布局 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          混合布局
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          任意组合列数，构建非均匀排版。
        </p>
        <div className="space-y-2">
          <Row gutter={16}>
            <Col span={16}><div className={colorClass(0)}>span=16（主内容）</div></Col>
            <Col span={8}><div className={colorClass(1)}>span=8（侧边）</div></Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}><div className={colorClass(0)}>span=8</div></Col>
            <Col span={8}><div className={colorClass(1)}>span=8</div></Col>
            <Col span={4}><div className={colorClass(2)}>span=4</div></Col>
            <Col span={4}><div className={colorClass(3)}>span=4</div></Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}><div className={colorClass(0)}>span=4</div></Col>
            <Col span={16}><div className={colorClass(1)}>span=16</div></Col>
            <Col span={4}><div className={colorClass(2)}>span=4</div></Col>
          </Row>
        </div>
      </section>

      {/* 4. 列偏移 Offset */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          列偏移
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          <code>offset</code> 属性指定左侧偏移的列数，通过 <code>margin-left</code> 实现。
        </p>
        <div className="space-y-2">
          <Row gutter={16}>
            <Col span={6}><div className={colorClass(0)}>span=6</div></Col>
            <Col span={6} offset={6}><div className={colorClass(1)}>span=6 offset=6</div></Col>
          </Row>
          <Row gutter={16}>
            <Col span={6} offset={6}><div className={colorClass(2)}>offset=6</div></Col>
            <Col span={6} offset={6}><div className={colorClass(3)}>offset=6</div></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} offset={6}><div className={colorClass(4)}>span=12 offset=6</div></Col>
          </Row>
        </div>
      </section>

      {/* 5. 推拉移位 Push / Pull */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          推拉移位
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          <code>push</code> 向右位移，<code>pull</code> 向左位移，基于 <code>position: relative</code>，常用于改变视觉顺序而不影响 DOM 顺序。
        </p>
        <div className="space-y-2">
          <Row gutter={16}>
            <Col span={18} push={6}><div className={colorClass(0)}>span=18 push=6（视觉在右）</div></Col>
            <Col span={6} pull={18}><div className={colorClass(1)}>span=6 pull=18（视觉在左）</div></Col>
          </Row>
        </div>
      </section>

      {/* 6. 对齐方式 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          对齐方式
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          <code>justify</code> 控制主轴对齐，<code>align</code> 控制交叉轴对齐。
        </p>

        {(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const).map((j) => (
          <div key={j} className="mb-3">
            <p className="text-xs text-neutral-500 mb-1">justify="{j}"</p>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-2">
              <Row justify={j} gutter={8}>
                <Col span={4}><div className={colorClass(0)}>A</div></Col>
                <Col span={4}><div className={colorClass(1)}>B</div></Col>
                <Col span={4}><div className={colorClass(2)}>C</div></Col>
              </Row>
            </div>
          </div>
        ))}

        <p className="text-xs text-neutral-500 mt-4 mb-1">align="middle"（垂直居中）</p>
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-2">
          <Row align="middle" gutter={8} style={{ height: 64 }}>
            <Col span={6}><div className={colorClass(0)} style={{ height: 32 }}>高 32px</div></Col>
            <Col span={6}><div className={colorClass(1)} style={{ height: 48 }}>高 48px</div></Col>
            <Col span={6}><div className={colorClass(2)} style={{ height: 20 }}>高 20px</div></Col>
          </Row>
        </div>
      </section>

      {/* 7. 响应式布局 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          响应式布局
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          支持 <code>xs / sm / md / lg / xl / xxl</code> 六个断点。调整浏览器宽度可观察列数变化。
          <br />
          当前示例：xs=24（1列）→ sm=12（2列）→ md=8（3列）→ lg=6（4列）
        </p>
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }, (_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6}>
              <div className={colorClass(i)}>卡片 {i + 1}</div>
            </Col>
          ))}
        </Row>
      </section>

      {/* 8. 嵌套栅格 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          嵌套栅格
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          Row 内可嵌套 Row，内层 <code>gutter</code> 独立计算，互不干扰。
        </p>
        <Row gutter={16}>
          <Col span={12}>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 mb-0">
              <p className="text-xs text-neutral-500 mb-2">外层 span=12</p>
              <Row gutter={8}>
                <Col span={12}><div className={colorClass(0)}>内层 span=12</div></Col>
                <Col span={12}><div className={colorClass(1)}>内层 span=12</div></Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3">
              <p className="text-xs text-neutral-500 mb-2">外层 span=12</p>
              <Row gutter={8}>
                <Col span={8}><div className={colorClass(2)}>内层 8</div></Col>
                <Col span={8}><div className={colorClass(3)}>内层 8</div></Col>
                <Col span={8}><div className={colorClass(4)}>内层 8</div></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}
