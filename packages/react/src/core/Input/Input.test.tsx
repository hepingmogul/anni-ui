import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  describe('渲染', () => {
    it('默认渲染 input 元素', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('placeholder 属性正确透传', () => {
      render(<Input placeholder="请输入内容" />)
      expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument()
    })

    it('prefix 内容正确渲染', () => {
      render(<Input prefix="前缀" />)
      expect(screen.getByText('前缀')).toBeInTheDocument()
    })

    it('suffix 内容正确渲染', () => {
      render(<Input suffix="后缀" />)
      expect(screen.getByText('后缀')).toBeInTheDocument()
    })

    it('size=sm 时对应类名生效', () => {
      render(<Input size="sm" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-7')
    })

    it('size=md 时对应类名生效', () => {
      render(<Input size="md" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-9')
    })

    it('size=lg 时对应类名生效', () => {
      render(<Input size="lg" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-11')
    })
  })

  describe('受控模式', () => {
    it('value 更新时输入框内容同步', () => {
      const { rerender } = render(<Input value="初始值" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('初始值')
      rerender(<Input value="新值" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('新值')
    })
  })

  describe('交互', () => {
    it('输入触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Input onChange={onChange} />)
      await userEvent.type(screen.getByRole('textbox'), 'hello')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('disabled', () => {
    it('禁用状态下 input 被禁用', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('无障碍', () => {
    it('传入 aria-invalid 时 input 携带对应属性', () => {
      render(<Input aria-invalid="true" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
