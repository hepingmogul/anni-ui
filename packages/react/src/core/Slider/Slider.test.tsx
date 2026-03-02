import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Slider } from './Slider'

describe('Slider', () => {
  describe('渲染', () => {
    it('单滑块渲染 role="slider"', () => {
      render(<Slider value={50} />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('aria-valuenow/min/max 属性正确挂载', () => {
      render(<Slider value={30} min={0} max={100} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '30')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
    })

    it('range=true 渲染两个 role="slider"', () => {
      render(<Slider range value={[20, 80]} />)
      expect(screen.getAllByRole('slider')).toHaveLength(2)
    })
  })

  describe('键盘操作', () => {
    it('右箭头键增加 step，触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} step={5} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(onChange).toHaveBeenCalledWith(55)
    })

    it('左箭头键减少 step，触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} step={5} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(onChange).toHaveBeenCalledWith(45)
    })

    it('上箭头键增加 step，触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} step={5} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowUp}')
      expect(onChange).toHaveBeenCalledWith(55)
    })

    it('下箭头键减少 step，触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} step={5} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowDown}')
      expect(onChange).toHaveBeenCalledWith(45)
    })

    it('Home 键跳至 min', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} min={0} max={100} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{Home}')
      expect(onChange).toHaveBeenCalledWith(0)
    })

    it('End 键跳至 max', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} min={0} max={100} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{End}')
      expect(onChange).toHaveBeenCalledWith(100)
    })

    it('其他按键不触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{Enter}')
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('边界条件', () => {
    it('值达到 max 后右箭头不越界', async () => {
      const onChange = vi.fn()
      render(<Slider value={100} min={0} max={100} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(onChange).toHaveBeenCalledWith(100)
    })

    it('值达到 min 后左箭头不越界', async () => {
      const onChange = vi.fn()
      render(<Slider value={0} min={0} max={100} onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(onChange).toHaveBeenCalledWith(0)
    })
  })

  describe('disabled', () => {
    it('disabled 时键盘操作不触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider value={50} disabled onChange={onChange} />)
      const slider = screen.getByRole('slider')
      slider.focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('range 双滑块', () => {
    it('range=true 第一个滑块键盘右箭头触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider range value={[20, 80]} step={5} onChange={onChange} />)
      const sliders = screen.getAllByRole('slider')
      sliders[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(onChange).toHaveBeenCalledWith([25, 80])
    })

    it('range=true 第二个滑块键盘左箭头触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Slider range value={[20, 80]} step={5} onChange={onChange} />)
      const sliders = screen.getAllByRole('slider')
      sliders[1].focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(onChange).toHaveBeenCalledWith([20, 75])
    })
  })

  describe('defaultValue', () => {
    it('非受控模式使用 defaultValue', () => {
      render(<Slider defaultValue={30} min={0} max={100} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '30')
    })
  })
})
