import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  describe('渲染', () => {
    it('默认渲染 role="switch" 且 aria-checked="false"', () => {
      render(<Switch />)
      const sw = screen.getByRole('switch')
      expect(sw).toBeInTheDocument()
      expect(sw).toHaveAttribute('aria-checked', 'false')
    })

    it('defaultChecked=true 时 aria-checked="true"', () => {
      render(<Switch defaultChecked />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })

    it('size=sm 时携带对应尺寸类名', () => {
      render(<Switch size="sm" />)
      expect(screen.getByRole('switch')).toHaveClass('w-8')
    })

    it('size=md 时携带对应尺寸类名', () => {
      render(<Switch size="md" />)
      expect(screen.getByRole('switch')).toHaveClass('w-11')
    })

    it('size=lg 时携带对应尺寸类名', () => {
      render(<Switch size="lg" />)
      expect(screen.getByRole('switch')).toHaveClass('w-14')
    })
  })

  describe('交互', () => {
    it('点击切换时触发 onChange(true)', async () => {
      const onChange = vi.fn()
      render(<Switch onChange={onChange} />)
      await userEvent.click(screen.getByRole('switch'))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('点击后 aria-checked 变为 true', async () => {
      render(<Switch />)
      const sw = screen.getByRole('switch')
      await userEvent.click(sw)
      expect(sw).toHaveAttribute('aria-checked', 'true')
    })

    it('再次点击 onChange(false)', async () => {
      const onChange = vi.fn()
      render(<Switch onChange={onChange} />)
      await userEvent.click(screen.getByRole('switch'))
      await userEvent.click(screen.getByRole('switch'))
      expect(onChange).toHaveBeenLastCalledWith(false)
    })
  })

  describe('受控模式', () => {
    it('checked prop 控制状态', () => {
      const { rerender } = render(<Switch checked={false} onChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
      rerender(<Switch checked={true} onChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('label 文字', () => {
    it('checkedLabel 在开启时显示', async () => {
      render(<Switch checkedLabel="开" uncheckedLabel="关" />)
      expect(screen.getByText('关')).toBeInTheDocument()
      await userEvent.click(screen.getByRole('switch'))
      expect(screen.getByText('开')).toBeInTheDocument()
    })
  })

  describe('键盘操作', () => {
    it('Space 键触发切换', async () => {
      const onChange = vi.fn()
      render(<Switch onChange={onChange} />)
      screen.getByRole('switch').focus()
      await userEvent.keyboard(' ')
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('Enter 键触发切换', async () => {
      const onChange = vi.fn()
      render(<Switch onChange={onChange} />)
      screen.getByRole('switch').focus()
      await userEvent.keyboard('{Enter}')
      expect(onChange).toHaveBeenCalledWith(true)
    })
  })

  describe('disabled', () => {
    it('disabled 时点击不触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Switch disabled onChange={onChange} />)
      await userEvent.click(screen.getByRole('switch'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('disabled 时按钮被禁用', () => {
      render(<Switch disabled />)
      expect(screen.getByRole('switch')).toBeDisabled()
    })
  })
})
