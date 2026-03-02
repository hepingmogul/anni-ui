import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Breadcrumb } from './Breadcrumb'

const items = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs' },
  { label: '当前页' },
]

describe('Breadcrumb', () => {
  describe('渲染', () => {
    it('根元素为 nav 且含 aria-label="breadcrumb"', () => {
      render(<Breadcrumb items={items} />)
      expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
    })

    it('最后一项含 aria-current="page"', () => {
      render(<Breadcrumb items={items} />)
      expect(screen.getByText('当前页')).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('链接模式', () => {
    it('有 href 时渲染 <a> 元素', () => {
      render(<Breadcrumb items={items} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveAttribute('href', '/')
    })
  })

  describe('按钮模式', () => {
    it('有 onClick 无 href 时渲染 button 元素', () => {
      const onClick = vi.fn()
      const buttonItems = [
        { label: '首页', onClick },
        { label: '当前页' },
      ]
      render(<Breadcrumb items={buttonItems} />)
      expect(screen.getByRole('button', { name: '首页' })).toBeInTheDocument()
    })

    it('点击按钮模式触发 onClick', async () => {
      const onClick = vi.fn()
      const buttonItems = [
        { label: '首页', onClick },
        { label: '当前页' },
      ]
      render(<Breadcrumb items={buttonItems} />)
      await userEvent.click(screen.getByRole('button', { name: '首页' }))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('自定义分隔符', () => {
    it('自定义 separator 内容正确渲染', () => {
      render(<Breadcrumb items={items} separator={<span data-testid="sep">/</span>} />)
      expect(screen.getAllByTestId('sep')).toHaveLength(2)
    })
  })
})
