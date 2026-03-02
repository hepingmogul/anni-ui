import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act } from '@testing-library/react'
import { render, screen } from '../../test/utils'
import { Toast } from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 清理上一个测试遗留的 toast 容器，让 Toast 模块重新挂载
    const existing = document.getElementById('react-toast-root')
    if (existing) existing.remove()
  })

  afterEach(() => {
    vi.useRealTimers()
    const existing = document.getElementById('react-toast-root')
    if (existing) existing.remove()
  })

  it('Toast.success 显示成功消息', async () => {
    render(<div id="app" />)
    act(() => { Toast.success('操作成功') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('操作成功')
  })

  it('Toast.error 显示错误消息', async () => {
    render(<div id="app" />)
    act(() => { Toast.error('操作失败') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('操作失败')
  })

  it('Toast.warning 显示警告消息', async () => {
    render(<div id="app" />)
    act(() => { Toast.warning('请注意') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('请注意')
  })

  it('超过 duration 后消息从 DOM 移除', async () => {
    render(<div id="app" />)
    act(() => { Toast.success('临时消息', { duration: 2000 }) })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('临时消息')
    await act(async () => { vi.advanceTimersByTime(2500) })
    expect(document.body.textContent).not.toContain('临时消息')
  })
})
