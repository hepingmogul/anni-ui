import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('数字模式（无 children）', () => {
    it('显示 count 数值', () => {
      render(<Badge count={5} />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('超出 overflowCount 时显示 "${max}+"', () => {
      render(<Badge count={100} max={99} />)
      expect(screen.getByText('99+')).toBeInTheDocument()
    })

    it('count=0 且无 showZero 时不显示数字内容', () => {
      render(<Badge count={0} data-testid="badge" />)
      // 无 children 模式下 span 仍渲染，但内容不显示 0
      const badge = screen.getByTestId('badge')
      expect(badge).toBeInTheDocument()
      expect(badge.textContent).toBe('')
    })

    it('count=0 且 showZero=true 时显示 0', () => {
      render(<Badge count={0} showZero />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('圆点模式', () => {
    it('dot=true 时不显示数字', () => {
      render(<Badge dot count={5} />)
      expect(screen.queryByText('5')).not.toBeInTheDocument()
    })
  })

  describe('包裹模式（有 children）', () => {
    it('有 children 时徽标浮于右上角', () => {
      render(
        <Badge count={3}>
          <button>按钮</button>
        </Badge>,
      )
      expect(screen.getByText('按钮')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('count=0 且无 showZero 时包裹模式不显示徽标', () => {
      render(
        <Badge count={0}>
          <button>按钮</button>
        </Badge>,
      )
      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })
  })

  describe('语义色', () => {
    it('variant=success 时携带对应类名', () => {
      render(<Badge count={1} variant="success" data-testid="badge" />)
      expect(screen.getByTestId('badge')).toHaveClass('bg-success')
    })

    it('variant=danger 时携带对应类名', () => {
      render(<Badge count={1} variant="danger" data-testid="badge" />)
      expect(screen.getByTestId('badge')).toHaveClass('bg-danger')
    })

    it('variant=warning 时携带对应类名', () => {
      render(<Badge count={1} variant="warning" data-testid="badge" />)
      expect(screen.getByTestId('badge')).toHaveClass('bg-warning')
    })

    it('variant=info 时携带对应类名', () => {
      render(<Badge count={1} variant="info" data-testid="badge" />)
      expect(screen.getByTestId('badge')).toHaveClass('bg-info')
    })
  })
})
