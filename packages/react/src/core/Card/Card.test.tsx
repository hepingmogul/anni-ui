import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Card } from './Card'

describe('Card', () => {
  describe('渲染', () => {
    it('渲染 children 内容', () => {
      render(<Card>卡片内容</Card>)
      expect(screen.getByText('卡片内容')).toBeInTheDocument()
    })

    it('title 字符串正确显示', () => {
      render(<Card title="卡片标题">内容</Card>)
      expect(screen.getByText('卡片标题')).toBeInTheDocument()
    })

    it('title 为 ReactNode 时正确渲染', () => {
      render(<Card title={<span data-testid="custom-title">自定义标题</span>}>内容</Card>)
      expect(screen.getByTestId('custom-title')).toBeInTheDocument()
    })

    it('footer 内容正确显示', () => {
      render(<Card footer="底部内容">内容</Card>)
      expect(screen.getByText('底部内容')).toBeInTheDocument()
    })

    it('不传 title 时无标题区域', () => {
      render(<Card>无标题</Card>)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('hoverable', () => {
    it('hoverable=true 时携带悬停样式类名', () => {
      render(<Card hoverable data-testid="card">内容</Card>)
      expect(screen.getByTestId('card')).toHaveClass('hover:shadow-md')
    })

    it('hoverable=false 时不含悬停样式类名', () => {
      render(<Card hoverable={false} data-testid="card">内容</Card>)
      expect(screen.getByTestId('card')).not.toHaveClass('hover:shadow-md')
    })
  })

  describe('className 追加', () => {
    it('自定义 className 正确合并', () => {
      render(<Card className="my-card" data-testid="card">内容</Card>)
      expect(screen.getByTestId('card')).toHaveClass('my-card')
    })
  })
})
