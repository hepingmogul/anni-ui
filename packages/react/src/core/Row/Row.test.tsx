import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '../../test/utils'
import { Row, Col } from './Row'

// ─── 工具函数：mock matchMedia 和 window.innerWidth ──────────────────────────

function mockWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })

  const listeners: Array<() => void> = []

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => {
      const minMatch = query.match(/min-width:\s*(\d+)px/)
      const minWidth = minMatch ? parseInt(minMatch[1], 10) : 0
      return {
        matches: width >= minWidth,
        media: query,
        onchange: null,
        addEventListener: (_: string, cb: () => void) => listeners.push(cb),
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }
    },
  })

  return {
    resize: (newWidth: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: newWidth,
      })
      listeners.forEach((cb) => cb())
    },
  }
}

// ─── Row ─────────────────────────────────────────────────────────────────────

describe('Row', () => {
  it('默认渲染为 div，flex 布局，justify-content: flex-start，align-items: flex-start', () => {
    render(<Row data-testid="row" />)
    const el = screen.getByTestId('row')
    expect(el.tagName).toBe('DIV')
    expect(el.style.display).toBe('flex')
    expect(el.style.justifyContent).toBe('flex-start')
    expect(el.style.alignItems).toBe('flex-start')
  })

  it('tag 属性：渲染为指定标签', () => {
    render(<Row data-testid="row" tag="section" />)
    expect(screen.getByTestId('row').tagName).toBe('SECTION')
  })

  it('wrap=true 时 flexWrap 为 wrap', () => {
    render(<Row data-testid="row" wrap />)
    expect(screen.getByTestId('row').style.flexWrap).toBe('wrap')
  })

  it('wrap=false 时 flexWrap 为 nowrap', () => {
    render(<Row data-testid="row" wrap={false} />)
    expect(screen.getByTestId('row').style.flexWrap).toBe('nowrap')
  })

  describe('justify 各取值', () => {
    const cases: Array<[string, string]> = [
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
      ['space-between', 'space-between'],
      ['space-around', 'space-around'],
      ['space-evenly', 'space-evenly'],
    ]
    it.each(cases)('justify="%s" → justifyContent: %s', (justify, expected) => {
      render(<Row data-testid="row" justify={justify as never} />)
      expect(screen.getByTestId('row').style.justifyContent).toBe(expected)
    })
  })

  describe('align 各取值', () => {
    const cases: Array<[string, string]> = [
      ['top', 'flex-start'],
      ['middle', 'center'],
      ['bottom', 'flex-end'],
      ['stretch', 'stretch'],
    ]
    it.each(cases)('align="%s" → alignItems: %s', (align, expected) => {
      render(<Row data-testid="row" align={align as never} />)
      expect(screen.getByTestId('row').style.alignItems).toBe(expected)
    })
  })

  describe('gutter 数字', () => {
    it('gutter=16：Row 设置负 margin，Col 设置正 padding', () => {
      render(
        <Row data-testid="row" gutter={16}>
          <Col data-testid="col" span={12} />
        </Row>,
      )
      const row = screen.getByTestId('row')
      const col = screen.getByTestId('col')
      expect(row.style.marginLeft).toBe('-8px')
      expect(row.style.marginRight).toBe('-8px')
      expect(col.style.paddingLeft).toBe('8px')
      expect(col.style.paddingRight).toBe('8px')
    })

    it('gutter=0：不设置 margin 和 padding', () => {
      render(
        <Row data-testid="row" gutter={0}>
          <Col data-testid="col" span={12} />
        </Row>,
      )
      const row = screen.getByTestId('row')
      expect(row.style.marginLeft).toBe('')
      expect(row.style.marginRight).toBe('')
    })
  })

  describe('gutter 数组', () => {
    it('gutter=[16, 8]：水平和垂直 gutter 分别生效', () => {
      render(
        <Row data-testid="row" gutter={[16, 8]}>
          <Col data-testid="col" span={12} />
        </Row>,
      )
      const row = screen.getByTestId('row')
      const col = screen.getByTestId('col')
      expect(row.style.marginLeft).toBe('-8px')
      expect(row.style.marginTop).toBe('-4px')
      expect(col.style.paddingLeft).toBe('8px')
      expect(col.style.paddingTop).toBe('4px')
    })
  })

  it('className 透传', () => {
    render(<Row data-testid="row" className="custom-row" />)
    expect(screen.getByTestId('row')).toHaveClass('custom-row')
  })

  it('正确渲染子节点', () => {
    render(
      <Row>
        <Col span={12}>左侧</Col>
        <Col span={12}>右侧</Col>
      </Row>,
    )
    expect(screen.getByText('左侧')).toBeDefined()
    expect(screen.getByText('右侧')).toBeDefined()
  })
})

// ─── Col ─────────────────────────────────────────────────────────────────────

describe('Col', () => {
  it('默认渲染为 div', () => {
    render(<Col data-testid="col" />)
    expect(screen.getByTestId('col').tagName).toBe('DIV')
  })

  it('tag 属性：渲染为指定标签', () => {
    render(<Col data-testid="col" tag="article" />)
    expect(screen.getByTestId('col').tagName).toBe('ARTICLE')
  })

  describe('span 宽度计算', () => {
    it('span=24 → width: 100%', () => {
      render(<Col data-testid="col" span={24} />)
      expect(screen.getByTestId('col').style.width).toBe('100%')
    })
    it('span=12 → width: 50%', () => {
      render(<Col data-testid="col" span={12} />)
      expect(screen.getByTestId('col').style.width).toBe('50%')
    })
    it('span=8 → width 约为 33.33%', () => {
      render(<Col data-testid="col" span={8} />)
      const width = parseFloat(screen.getByTestId('col').style.width)
      expect(width).toBeCloseTo(33.333, 2)
    })
    it('span=6 → width: 25%', () => {
      render(<Col data-testid="col" span={6} />)
      expect(screen.getByTestId('col').style.width).toBe('25%')
    })
    it('span=4 → width 约为 16.67%', () => {
      render(<Col data-testid="col" span={4} />)
      const width = parseFloat(screen.getByTestId('col').style.width)
      expect(width).toBeCloseTo(16.667, 2)
    })
    it('span=1 → width 约为 4.17%', () => {
      render(<Col data-testid="col" span={1} />)
      const width = parseFloat(screen.getByTestId('col').style.width)
      expect(width).toBeCloseTo(4.167, 2)
    })
  })

  it('span=0 时 display: none', () => {
    render(<Col data-testid="col" span={0} />)
    const col = screen.getByTestId('col')
    expect(col.style.display).toBe('none')
  })

  it('未指定 span 时默认占满（100%）', () => {
    render(<Col data-testid="col" />)
    expect(screen.getByTestId('col').style.width).toBe('100%')
  })

  it('offset 计算正确', () => {
    render(<Col data-testid="col" offset={6} />)
    expect(screen.getByTestId('col').style.marginLeft).toBe('25%')
  })

  it('offset=0 不设置 marginLeft', () => {
    render(<Col data-testid="col" offset={0} />)
    expect(screen.getByTestId('col').style.marginLeft).toBe('')
  })

  it('push 正确设置 position relative 和 left', () => {
    render(<Col data-testid="col" push={6} />)
    const col = screen.getByTestId('col')
    expect(col.style.position).toBe('relative')
    expect(col.style.left).toBe('25%')
  })

  it('pull 正确设置 position relative 和 right', () => {
    render(<Col data-testid="col" pull={6} />)
    const col = screen.getByTestId('col')
    expect(col.style.position).toBe('relative')
    expect(col.style.right).toBe('25%')
  })

  it('className 透传', () => {
    render(<Col data-testid="col" className="custom-col" />)
    expect(screen.getByTestId('col')).toHaveClass('custom-col')
  })

  it('正确渲染子节点', () => {
    render(<Col>内容文本</Col>)
    expect(screen.getByText('内容文本')).toBeDefined()
  })

  describe('嵌套 Row/Col gutter 隔离', () => {
    it('内层 Row 的 gutter 不受外层影响', () => {
      render(
        <Row gutter={20}>
          <Col span={12}>
            <Row data-testid="inner-row" gutter={8}>
              <Col data-testid="inner-col" span={12} />
            </Row>
          </Col>
        </Row>,
      )
      const innerRow = screen.getByTestId('inner-row')
      const innerCol = screen.getByTestId('inner-col')
      expect(innerRow.style.marginLeft).toBe('-4px')
      expect(innerCol.style.paddingLeft).toBe('4px')
    })
  })
})

// ─── 响应式断点 ───────────────────────────────────────────────────────────────

describe('Col 响应式', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('xs 断点（320px）：应用 xs 配置', async () => {
    mockWindowWidth(320)
    render(
      <Row>
        <Col data-testid="col" xs={24} sm={12} md={8} />
      </Row>,
    )
    const col = screen.getByTestId('col')
    expect(col.style.width).toBe('100%')
  })

  it('sm 断点（600px）：应用 sm 配置', () => {
    mockWindowWidth(600)
    render(
      <Row>
        <Col data-testid="col" xs={24} sm={12} md={8} />
      </Row>,
    )
    const col = screen.getByTestId('col')
    expect(col.style.width).toBe('50%')
  })

  it('md 断点（900px）：应用 md 配置', () => {
    mockWindowWidth(900)
    render(
      <Row>
        <Col data-testid="col" xs={24} sm={12} md={8} />
      </Row>,
    )
    const col = screen.getByTestId('col')
    const width = parseFloat(col.style.width)
    expect(width).toBeCloseTo(33.333, 2)
  })

  it('lg 断点（1200px）：应用 lg 配置', () => {
    mockWindowWidth(1200)
    render(
      <Row>
        <Col data-testid="col" xs={24} sm={12} md={8} lg={6} />
      </Row>,
    )
    const col = screen.getByTestId('col')
    expect(col.style.width).toBe('25%')
  })

  it('响应式对象写法：md={{ span: 12, offset: 2 }}', () => {
    mockWindowWidth(900)
    render(
      <Row>
        <Col data-testid="col" md={{ span: 12, offset: 2 }} />
      </Row>,
    )
    const col = screen.getByTestId('col')
    expect(col.style.width).toBe('50%')
    const marginLeft = parseFloat(col.style.marginLeft)
    expect(marginLeft).toBeCloseTo(8.333, 2)
  })

  it('xs=0 在小屏下隐藏（display: none）', () => {
    mockWindowWidth(320)
    render(
      <Row>
        <Col data-testid="col" xs={0} sm={6} />
      </Row>,
    )
    expect(screen.getByTestId('col').style.display).toBe('none')
  })

  it('窗口 resize 后断点切换', async () => {
    const { resize } = mockWindowWidth(320)
    render(
      <Row>
        <Col data-testid="col" xs={24} lg={6} />
      </Row>,
    )
    expect(screen.getByTestId('col').style.width).toBe('100%')

    act(() => {
      resize(1300)
    })

    expect(screen.getByTestId('col').style.width).toBe('25%')
  })
})
