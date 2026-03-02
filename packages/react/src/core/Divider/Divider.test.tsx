import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Divider } from './Divider'

describe('Divider', () => {
  describe('水平分割线', () => {
    it('默认渲染水平分割线（my-4 h-px）', () => {
      render(<Divider data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('h-px')
    })

    it('水平模式包含 my-4 类名', () => {
      render(<Divider data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('my-4')
    })
  })

  describe('垂直分割线', () => {
    it('orientation="vertical" 渲染垂直样式（inline-block 和 w-px）', () => {
      render(<Divider data-testid="divider" orientation="vertical" />)
      const el = screen.getByTestId('divider')
      expect(el).toHaveClass('inline-block')
      expect(el).toHaveClass('w-px')
    })
  })

  describe('带文字', () => {
    it('有 children 时渲染分隔文字', () => {
      render(<Divider>分隔文字</Divider>)
      expect(screen.getByText('分隔文字')).toBeInTheDocument()
    })
  })

  describe('dashed', () => {
    it('dashed=true 时包含 border-dashed 类名', () => {
      render(<Divider data-testid="divider" dashed />)
      expect(screen.getByTestId('divider')).toHaveClass('border-dashed')
    })
  })

  describe('textAlign', () => {
    it('textAlign="left" 时文字左对齐', () => {
      render(<Divider textAlign="left">左对齐</Divider>)
      expect(screen.getByText('左对齐')).toBeInTheDocument()
    })

    it('textAlign="right" 时文字右对齐', () => {
      render(<Divider textAlign="right">右对齐</Divider>)
      expect(screen.getByText('右对齐')).toBeInTheDocument()
    })
  })

  describe('className 追加', () => {
    it('自定义 className 正确合并', () => {
      render(<Divider data-testid="divider" className="my-custom" />)
      expect(screen.getByTestId('divider')).toHaveClass('my-custom')
    })
  })
})
