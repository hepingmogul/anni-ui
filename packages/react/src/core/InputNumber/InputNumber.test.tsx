import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { InputNumber } from './InputNumber'

describe('InputNumber', () => {
  describe('渲染', () => {
    it('渲染加减按钮', () => {
      render(<InputNumber />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })

    it('渲染输入框', () => {
      render(<InputNumber />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('步进操作', () => {
    it('点击 + 按钮触发 onChange(value + step)', async () => {
      const onChange = vi.fn()
      render(<InputNumber value={5} step={1} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')
      await userEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledWith(6)
    })

    it('点击 - 按钮触发 onChange(value - step)', async () => {
      const onChange = vi.fn()
      render(<InputNumber value={5} step={1} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')
      await userEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith(4)
    })
  })

  describe('边界条件', () => {
    it('值等于 min 时 - 按钮被禁用', () => {
      render(<InputNumber value={0} min={0} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('值等于 max 时 + 按钮被禁用', () => {
      render(<InputNumber value={10} max={10} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })

    it('值小于 min 时 - 按钮被禁用', () => {
      render(<InputNumber value={0} min={1} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('值大于 max 时 + 按钮被禁用', () => {
      render(<InputNumber value={10} max={9} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })
  })

  describe('disabled', () => {
    it('disabled 时两个步进按钮均被禁用', () => {
      render(<InputNumber disabled />)
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

    it('disabled 时输入框被禁用', () => {
      render(<InputNumber disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('precision', () => {
    it('precision=2 时点击 + 保留 2 位小数', async () => {
      const onChange = vi.fn()
      render(<InputNumber value={1.0} step={0.1} precision={2} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')
      await userEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledWith(1.1)
    })
  })

  describe('手动输入', () => {
    it('blur 后解析输入值并触发 onChange', async () => {
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.type(input, '42')
      await userEvent.tab()
      expect(onChange).toHaveBeenCalledWith(42)
    })

    it('blur 时输入为空则 onChange(null)', async () => {
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.tab()
      expect(onChange).toHaveBeenCalledWith(null)
    })

    it('blur 时输入非数字则 onChange(null)', async () => {
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.type(input, 'abc')
      await userEvent.tab()
      expect(onChange).toHaveBeenCalledWith(null)
    })

    it('blur 时值超出 max 会被 clamp', async () => {
      const onChange = vi.fn()
      render(<InputNumber max={10} onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.type(input, '100')
      await userEvent.tab()
      expect(onChange).toHaveBeenCalledWith(10)
    })

    it('blur 时值低于 min 会被 clamp', async () => {
      const onChange = vi.fn()
      render(<InputNumber min={5} onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      await userEvent.type(input, '1')
      await userEvent.tab()
      expect(onChange).toHaveBeenCalledWith(5)
    })
  })
})
