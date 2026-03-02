import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const items = [
  { key: 'tab1', label: '选项卡1', children: <div>内容1</div> },
  { key: 'tab2', label: '选项卡2', children: <div>内容2</div> },
  { key: 'tab3', label: '选项卡3', children: <div>内容3</div>, disabled: true },
]

describe('Tabs', () => {
  describe('渲染', () => {
    it('默认选中第一个 Tab', () => {
      render(<Tabs items={items} />)
      expect(screen.getByText('内容1')).toBeInTheDocument()
    })

    it('defaultActiveKey 指定默认选中 Tab', () => {
      render(<Tabs items={items} defaultActiveKey="tab2" />)
      expect(screen.getByText('内容2')).toBeInTheDocument()
    })
  })

  describe('非受控模式', () => {
    it('点击其他 Tab 后面板内容切换', async () => {
      render(<Tabs items={items} />)
      await userEvent.click(screen.getByRole('button', { name: '选项卡2' }))
      expect(screen.getByText('内容2')).toBeInTheDocument()
    })
  })

  describe('受控模式', () => {
    it('activeKey + onChange 控制当前 Tab', async () => {
      const onChange = vi.fn()
      const { rerender } = render(<Tabs items={items} activeKey="tab1" onChange={onChange} />)
      expect(screen.getByText('内容1')).toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', { name: '选项卡2' }))
      expect(onChange).toHaveBeenCalledWith('tab2')
      rerender(<Tabs items={items} activeKey="tab2" onChange={onChange} />)
      expect(screen.getByText('内容2')).toBeInTheDocument()
    })
  })

  describe('禁用选项', () => {
    it('点击禁用 Tab 不触发 onChange', async () => {
      const onChange = vi.fn()
      render(<Tabs items={items} onChange={onChange} />)
      await userEvent.click(screen.getByRole('button', { name: '选项卡3' }))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('禁用 Tab 携带禁用样式', () => {
      render(<Tabs items={items} />)
      expect(screen.getByRole('button', { name: '选项卡3' })).toBeDisabled()
    })
  })
})
