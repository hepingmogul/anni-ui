import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Space } from './Space'

describe('Space', () => {
  describe('方向', () => {
    it('默认水平排列（flex-row）', () => {
      render(<Space data-testid="space"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('flex-row')
    })

    it('direction="vertical" 垂直排列（flex-col）', () => {
      render(<Space data-testid="space" direction="vertical"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('flex-col')
    })
  })

  describe('size 预设', () => {
    it('size="xs" 对应 gap-1', () => {
      render(<Space data-testid="space" size="xs"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('gap-1')
    })

    it('size="sm" 对应 gap-2', () => {
      render(<Space data-testid="space" size="sm"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('gap-2')
    })

    it('size="md" 对应 gap-4', () => {
      render(<Space data-testid="space" size="md"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('gap-4')
    })

    it('size="lg" 对应 gap-6', () => {
      render(<Space data-testid="space" size="lg"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('gap-6')
    })

    it('size="xl" 对应 gap-8', () => {
      render(<Space data-testid="space" size="xl"><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('gap-8')
    })
  })

  describe('wrap', () => {
    it('wrap=true 时添加 flex-wrap 类名', () => {
      render(<Space data-testid="space" wrap><span>A</span></Space>)
      expect(screen.getByTestId('space')).toHaveClass('flex-wrap')
    })

    it('wrap=false 时不含 flex-wrap 类名', () => {
      render(<Space data-testid="space" wrap={false}><span>A</span></Space>)
      expect(screen.getByTestId('space')).not.toHaveClass('flex-wrap')
    })
  })

  describe('children', () => {
    it('正确渲染子节点内容', () => {
      render(<Space><span>项目A</span><span>项目B</span></Space>)
      expect(screen.getByText('项目A')).toBeInTheDocument()
      expect(screen.getByText('项目B')).toBeInTheDocument()
    })
  })
})
