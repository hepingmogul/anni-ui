import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Anchor } from './Anchor'

// 无 href 的 <a> role 为 generic，需要 hidden:true 或改用 getByRole('link') 仅在有 href 时使用
// 封装辅助函数：优先 getByRole('link')，否则 getByRole('generic', { hidden: true })
function getAnchorEl() {
  const byLink = document.querySelector('a')
  if (!byLink) throw new Error('找不到 <a> 元素')
  return byLink
}

describe('Anchor', () => {
  describe('默认渲染', () => {
    it('渲染为 <a> 标签', () => {
      render(<Anchor>链接文本</Anchor>)
      expect(getAnchorEl()).toBeInTheDocument()
    })

    it('默认含 default 类型颜色类名', () => {
      render(<Anchor>链接文本</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-neutral-700')
    })

    it('默认下划线为 hover 模式', () => {
      render(<Anchor>链接文本</Anchor>)
      const link = getAnchorEl()
      expect(link).toHaveClass('no-underline')
      expect(link).toHaveClass('hover:underline')
    })
  })

  describe('type 各取值', () => {
    it('type="primary" 挂载 primary 颜色类名', () => {
      render(<Anchor type="primary">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-primary')
    })

    it('type="success" 挂载 success 颜色类名', () => {
      render(<Anchor type="success">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-success')
    })

    it('type="warning" 挂载 warning 颜色类名', () => {
      render(<Anchor type="warning">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-warning')
    })

    it('type="danger" 挂载 danger 颜色类名', () => {
      render(<Anchor type="danger">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-danger')
    })

    it('type="info" 挂载 info 颜色类名', () => {
      render(<Anchor type="info">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('text-info')
    })
  })

  describe('下划线控制', () => {
    it('underline="always" 始终含下划线类名', () => {
      render(<Anchor underline="always">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('underline')
    })

    it('underline="hover" 默认无下划线但含 hover:underline', () => {
      render(<Anchor underline="hover">链接</Anchor>)
      const link = getAnchorEl()
      expect(link).toHaveClass('no-underline')
      expect(link).toHaveClass('hover:underline')
    })

    it('underline="never" 无下划线类名', () => {
      render(<Anchor underline="never">链接</Anchor>)
      const link = getAnchorEl()
      expect(link).toHaveClass('no-underline')
      expect(link).not.toHaveClass('hover:underline')
    })
  })

  describe('禁用状态', () => {
    it('disabled=true 时含 aria-disabled="true"', () => {
      render(<Anchor disabled>链接</Anchor>)
      expect(getAnchorEl()).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled=true 时 tabIndex 为 -1', () => {
      render(<Anchor disabled>链接</Anchor>)
      expect(getAnchorEl()).toHaveAttribute('tabindex', '-1')
    })

    it('disabled 状态下点击事件不触发', async () => {
      const onClick = vi.fn()
      render(
        <Anchor disabled onClick={onClick}>
          链接
        </Anchor>,
      )
      await userEvent.click(getAnchorEl())
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('href 安全净化', () => {
    it('传入合法 https 链接时 href 正常渲染', () => {
      render(<Anchor href="https://example.com">链接</Anchor>)
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com/')
    })

    it('传入 javascript: 协议时 href 输出为 #', () => {
      render(<Anchor href="javascript:alert(1)">链接</Anchor>)
      expect(screen.getByRole('link')).toHaveAttribute('href', '#')
    })

    it('不传 href 时不渲染 href 属性', () => {
      render(<Anchor>链接</Anchor>)
      expect(getAnchorEl()).not.toHaveAttribute('href')
    })
  })

  describe('target="_blank" 安全', () => {
    it('target="_blank" 时自动附加 rel="noopener noreferrer"', () => {
      render(
        <Anchor href="https://example.com" target="_blank">
          链接
        </Anchor>,
      )
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('rel')
      const rel = link.getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    })
  })

  describe('icon prop', () => {
    it('图标正确渲染并含 aria-hidden="true"', () => {
      const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg data-testid="test-icon" {...props}>
          <path d="M0 0" />
        </svg>
      )
      render(<Anchor icon={TestIcon}>链接</Anchor>)
      const icon = screen.getByTestId('test-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('onClick', () => {
    it('非禁用状态下点击触发 onClick', async () => {
      const onClick = vi.fn()
      render(<Anchor onClick={onClick}>链接</Anchor>)
      await userEvent.click(getAnchorEl())
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('className 透传', () => {
    it('附加类名正确合并到 <a> 元素', () => {
      render(<Anchor className="custom-class">链接</Anchor>)
      expect(getAnchorEl()).toHaveClass('custom-class')
    })
  })

  describe('asChild 模式', () => {
    it('asChild=true 时不渲染 <a> 标签，子元素含 Anchor 样式类名', () => {
      render(
        <Anchor asChild type="primary">
          <button>子按钮</button>
        </Anchor>,
      )
      const btn = screen.getByRole('button', { name: '子按钮' })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveClass('text-primary')
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('asChild + type 时子元素含正确颜色类名', () => {
      render(
        <Anchor asChild type="danger">
          <button>危险操作</button>
        </Anchor>,
      )
      expect(screen.getByRole('button')).toHaveClass('text-danger')
    })

    it('asChild + disabled 时子元素含 aria-disabled="true"，tabIndex=-1，onClick 被拦截', async () => {
      const childClick = vi.fn()
      render(
        <Anchor asChild disabled>
          <button onClick={childClick}>禁用子元素</button>
        </Anchor>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveAttribute('aria-disabled', 'true')
      expect(btn).toHaveAttribute('tabindex', '-1')
      await userEvent.click(btn)
      expect(childClick).not.toHaveBeenCalled()
    })

    it('asChild + onClick 合并：Anchor onClick 与子元素 onClick 均被执行', async () => {
      const anchorClick = vi.fn()
      const childClick = vi.fn()
      render(
        <Anchor asChild onClick={anchorClick}>
          <button onClick={childClick}>子元素</button>
        </Anchor>,
      )
      await userEvent.click(screen.getByRole('button'))
      expect(anchorClick).toHaveBeenCalledTimes(1)
      expect(childClick).toHaveBeenCalledTimes(1)
    })

    it('asChild + className 合并：Anchor 类名在前，子元素类名在后', () => {
      render(
        <Anchor asChild type="primary">
          <button className="child-class">子元素</button>
        </Anchor>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('text-primary')
      expect(btn).toHaveClass('child-class')
    })

    it('asChild + icon 时渲染外层容器含图标，子元素正常渲染', () => {
      const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg data-testid="icon" {...props}>
          <path d="M0 0" />
        </svg>
      )
      render(
        <Anchor asChild icon={TestIcon} type="primary">
          <button>带图标子元素</button>
        </Anchor>,
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '带图标子元素' })).toBeInTheDocument()
    })
  })

  describe('无障碍', () => {
    it('禁用态 aria-disabled 属性值为 "true"', () => {
      render(<Anchor disabled>链接</Anchor>)
      expect(getAnchorEl()).toHaveAttribute('aria-disabled', 'true')
    })

    it('图标含 aria-hidden="true"', () => {
      const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg data-testid="icon" {...props}>
          <path d="M0 0" />
        </svg>
      )
      render(<Anchor icon={TestIcon}>链接</Anchor>)
      expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true')
    })

    it('target="_blank" 时 rel 属性含 noopener 和 noreferrer', () => {
      render(
        <Anchor href="https://example.com" target="_blank">
          链接
        </Anchor>,
      )
      const rel = screen.getByRole('link').getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    })
  })
})
