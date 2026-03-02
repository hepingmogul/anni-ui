import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('渲染', () => {
    it('默认渲染未选中状态', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('defaultChecked=true 时初始为选中状态', () => {
      render(<Checkbox defaultChecked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })

  describe('非受控模式', () => {
    it('点击后切换为选中状态', async () => {
      render(<Checkbox />)
      const input = screen.getByRole('checkbox')
      expect(input).not.toBeChecked()
      await userEvent.click(input)
      expect(input).toBeChecked()
    })

    it('再次点击后取消选中', async () => {
      render(<Checkbox />)
      const input = screen.getByRole('checkbox')
      await userEvent.click(input)
      await userEvent.click(input)
      expect(input).not.toBeChecked()
    })
  })

  describe('受控模式', () => {
    it('checked prop 控制选中状态', () => {
      const { rerender } = render(<Checkbox checked={false} onChange={() => {}} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
      rerender(<Checkbox checked={true} onChange={() => {}} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })

  describe('交互', () => {
    it('点击触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Checkbox onChange={onChange} />)
      await userEvent.click(screen.getByRole('checkbox'))
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('边界条件', () => {
    it('disabled 状态下点击不触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Checkbox disabled onChange={onChange} />)
      await userEvent.click(screen.getByRole('checkbox'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('disabled 状态下 checkbox 被禁用', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })
  })

  describe('无障碍', () => {
    it('传入 aria-invalid 时携带对应属性', () => {
      render(<Checkbox aria-invalid="true" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
