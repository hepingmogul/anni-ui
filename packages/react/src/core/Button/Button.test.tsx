import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { Star } from 'lucide-react'

describe('Button', () => {
  describe('渲染', () => {
    it('默认渲染为 button 元素', () => {
      render(<Button>点击我</Button>)
      expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument()
    })

    it('loading 状态下显示加载指示器（animate-spin 图标）', () => {
      const { container } = render(<Button loading>提交</Button>)
      expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('loading 状态下按钮被禁用', () => {
      render(<Button loading>提交</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled 状态下 button 被禁用', () => {
      render(<Button disabled>禁用</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('variant=primary 时携带对应类名', () => {
      render(<Button variant="primary">主要</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')
    })

    it('variant=secondary 时携带对应类名', () => {
      render(<Button variant="secondary">次要</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-neutral-100')
    })

    it('variant=ghost 时携带对应类名', () => {
      render(<Button variant="ghost">幽灵</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    })

    it('variant=danger 时携带对应类名', () => {
      render(<Button variant="danger">危险</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-danger')
    })

    it('size=sm 时携带对应类名', () => {
      render(<Button size="sm">小</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-7')
    })

    it('size=md 时携带对应类名', () => {
      render(<Button size="md">中</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-9')
    })

    it('size=lg 时携带对应类名', () => {
      render(<Button size="lg">大</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-11')
    })

    it('iconPosition=left 时图标在左侧', () => {
      render(<Button icon={Star} iconPosition="left">图标左</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('iconPosition=right 时图标在右侧', () => {
      render(<Button icon={Star} iconPosition="right">图标右</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('交互', () => {
    it('点击触发 onClick，且只触发 1 次', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>点击</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('loading 状态下点击不触发 onClick', async () => {
      const onClick = vi.fn()
      render(<Button loading onClick={onClick}>提交</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('disabled 状态下点击不触发 onClick', async () => {
      const onClick = vi.fn()
      render(<Button disabled onClick={onClick}>禁用</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('className 追加', () => {
    it('自定义 className 被正确合并', () => {
      render(<Button className="my-custom-class">按钮</Button>)
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })
})
