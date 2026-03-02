import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from './Radio'

describe('Radio', () => {
  describe('RadioGroup 渲染', () => {
    it('渲染 role="radiogroup"', () => {
      render(
        <RadioGroup>
          <Radio value="a" label="选项A" />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('options 写法渲染正确数量的 Radio', () => {
      const options = [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
        { value: 'c', label: '选项C' },
      ]
      render(<RadioGroup options={options} />)
      // 使用原生 input[type=radio] 查询，避免 span[role=radio] 干扰
      const { container } = render(<RadioGroup options={options} />)
      const inputs = container.querySelectorAll('input[type="radio"]')
      expect(inputs).toHaveLength(3)
    })
  })

  describe('非受控模式', () => {
    it('点击选项后 onChange 以对应 value 触发', async () => {
      const onChange = vi.fn()
      render(
        <RadioGroup onChange={onChange}>
          <Radio value="a" label="选项A" />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      await userEvent.click(screen.getByLabelText('选项A'))
      expect(onChange).toHaveBeenCalledWith('a')
    })
  })

  describe('受控模式', () => {
    it('value prop 控制当前选中项', () => {
      const { rerender } = render(
        <RadioGroup value="a" onChange={() => {}}>
          <Radio value="a" label="选项A" />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      expect(screen.getByLabelText('选项A')).toBeChecked()
      rerender(
        <RadioGroup value="b" onChange={() => {}}>
          <Radio value="a" label="选项A" />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      expect(screen.getByLabelText('选项B')).toBeChecked()
    })
  })

  describe('disabled', () => {
    it('组级 disabled 时所有选项不可交互', async () => {
      const onChange = vi.fn()
      render(
        <RadioGroup disabled onChange={onChange}>
          <Radio value="a" label="选项A" />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      await userEvent.click(screen.getByLabelText('选项A'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('项级 disabled 时仅对应项不可交互', async () => {
      const onChange = vi.fn()
      render(
        <RadioGroup onChange={onChange}>
          <Radio value="a" label="选项A" disabled />
          <Radio value="b" label="选项B" />
        </RadioGroup>,
      )
      await userEvent.click(screen.getByLabelText('选项A'))
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getByLabelText('选项B'))
      expect(onChange).toHaveBeenCalledWith('b')
    })
  })
})
