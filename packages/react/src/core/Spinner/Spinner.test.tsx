import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  describe('渲染', () => {
    it('渲染 role="status" 元素', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('包含 aria-label="加载中"', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '加载中')
    })
  })

  describe('颜色', () => {
    it('color=primary 时携带对应类名', () => {
      render(<Spinner color="primary" />)
      expect(screen.getByRole('status')).toHaveClass('text-primary')
    })

    it('color=danger 时携带对应类名', () => {
      render(<Spinner color="danger" />)
      expect(screen.getByRole('status')).toHaveClass('text-danger')
    })

    it('color=white 时携带对应类名', () => {
      render(<Spinner color="white" />)
      expect(screen.getByRole('status')).toHaveClass('text-white')
    })
  })

  describe('className 追加', () => {
    it('自定义 className 正确合并', () => {
      render(<Spinner className="my-spinner" />)
      expect(screen.getByRole('status')).toHaveClass('my-spinner')
    })
  })
})
