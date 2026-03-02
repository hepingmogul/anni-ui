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

  describe('size 扩展', () => {
    it('size=xs 时携带对应类名 h-6', () => {
      render(<Button size="xs">超小</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-6')
    })

    it('size=xl 时携带对应类名 h-[3.25rem]', () => {
      render(<Button size="xl">超大</Button>)
      expect(screen.getByRole('button').className).toContain('h-[3.25rem]')
    })
  })

  describe('outline 形态', () => {
    it('variant=primary + outline 时携带 border-primary 类名', () => {
      render(<Button variant="primary" outline>描边主色</Button>)
      expect(screen.getByRole('button')).toHaveClass('border-primary')
    })

    it('variant=danger + outline 时携带 border-danger 类名', () => {
      render(<Button variant="danger" outline>描边危险</Button>)
      expect(screen.getByRole('button')).toHaveClass('border-danger')
    })

    it('variant=secondary + outline 时携带 border-neutral-300 类名', () => {
      render(<Button variant="secondary" outline>描边次要</Button>)
      expect(screen.getByRole('button')).toHaveClass('border-neutral-300')
    })

    it('outline 时背景透明', () => {
      render(<Button variant="primary" outline>描边</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    })

    it('outline + disabled 时携带禁用类名', () => {
      render(<Button variant="primary" outline disabled>禁用描边</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('outline + loading 时按钮被禁用', async () => {
      const onClick = vi.fn()
      render(<Button variant="primary" outline loading onClick={onClick}>加载</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('plain 形态', () => {
    it('variant=primary + plain 时携带 text-primary 类名', () => {
      render(<Button variant="primary" plain>纯文本主色</Button>)
      expect(screen.getByRole('button')).toHaveClass('text-primary')
    })

    it('variant=danger + plain 时携带 text-danger 类名', () => {
      render(<Button variant="danger" plain>纯文本危险</Button>)
      expect(screen.getByRole('button')).toHaveClass('text-danger')
    })

    it('plain 时不携带背景色类名', () => {
      render(<Button variant="primary" plain>纯文本</Button>)
      expect(screen.getByRole('button')).not.toHaveClass('bg-primary')
    })

    it('plain + disabled 时携带 disabled:text-neutral-400 类名', () => {
      render(<Button variant="primary" plain disabled>禁用纯文本</Button>)
      expect(screen.getByRole('button').className).toContain('disabled:text-neutral-400')
    })
  })

  describe('round 圆角', () => {
    it('round 时携带 rounded-full 类名', () => {
      render(<Button round>圆角</Button>)
      expect(screen.getByRole('button')).toHaveClass('rounded-full')
    })

    it('未传 round 时携带 rounded-md 类名', () => {
      render(<Button>普通</Button>)
      expect(screen.getByRole('button')).toHaveClass('rounded-md')
    })

    it('round + outline 组合时同时携带 rounded-full 和 border-primary', () => {
      render(<Button variant="primary" outline round>圆角描边</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('rounded-full')
      expect(btn).toHaveClass('border-primary')
    })
  })

  describe('circle 正圆图标按钮', () => {
    it('circle + size=xs 时携带 w-6 h-6', () => {
      render(<Button circle size="xs" icon={Star} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('w-6')
      expect(btn).toHaveClass('h-6')
    })

    it('circle + size=sm 时携带 w-7 h-7', () => {
      render(<Button circle size="sm" icon={Star} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('w-7')
      expect(btn).toHaveClass('h-7')
    })

    it('circle + size=md 时携带 w-9 h-9', () => {
      render(<Button circle size="md" icon={Star} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('w-9')
      expect(btn).toHaveClass('h-9')
    })

    it('circle + size=xl 时携带 w-[3.25rem] h-[3.25rem]', () => {
      render(<Button circle size="xl" icon={Star} />)
      const btn = screen.getByRole('button')
      expect(btn.className).toContain('w-[3.25rem]')
      expect(btn.className).toContain('h-[3.25rem]')
    })

    it('circle 时携带 rounded-full', () => {
      render(<Button circle icon={Star} />)
      expect(screen.getByRole('button')).toHaveClass('rounded-full')
    })

    it('circle 时不携带 px- 横向内边距', () => {
      const { container } = render(<Button circle size="md" icon={Star} />)
      const btn = container.querySelector('button')!
      expect(btn.className).not.toMatch(/\bpx-\d/)
    })
  })

  describe('block 块级', () => {
    it('block 时携带 w-full 类名', () => {
      render(<Button block>块级按钮</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })

    it('未传 block 时不携带 w-full', () => {
      render(<Button>普通按钮</Button>)
      expect(screen.getByRole('button')).not.toHaveClass('w-full')
    })
  })

  describe('tag 自定义标签', () => {
    it('tag="a" 时渲染为 <a> 元素', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Button tag="a" {...{ href: 'https://example.com' } as any}>链接</Button>)
      expect(container.querySelector('a')).toBeInTheDocument()
    })

    it('tag="a" 时不渲染为 <button> 元素', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Button tag="a" {...{ href: 'https://example.com' } as any}>链接</Button>)
      expect(container.querySelector('button')).not.toBeInTheDocument()
    })

    it('tag="a" 时 href 被正确传递', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Button tag="a" {...{ href: 'https://example.com' } as any}>链接</Button>)
      expect(container.querySelector('a')).toHaveAttribute('href', 'https://example.com')
    })
  })

  describe('互斥边界', () => {
    it('plain + outline 同时传入时，plain 样式生效（携带 text-primary，不携带 border-primary）', () => {
      render(<Button variant="primary" plain outline>混合</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('text-primary')
      expect(btn).not.toHaveClass('border-primary')
    })

    it('circle + round 同时传入时，circle 样式生效（携带 w-9 等宽高类）', () => {
      render(<Button circle round size="md" icon={Star} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('w-9')
      expect(btn).toHaveClass('rounded-full')
    })
  })
})
