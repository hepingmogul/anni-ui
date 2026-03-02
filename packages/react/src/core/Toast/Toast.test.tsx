import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act } from '@testing-library/react'
import { render } from '../../test/utils'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.resetModules()
    const existing = document.getElementById('react-toast-root')
    if (existing) existing.remove()
  })

  afterEach(() => {
    vi.useRealTimers()
    const existing = document.getElementById('react-toast-root')
    if (existing) existing.remove()
  })

  it('Toast.success 显示成功消息', async () => {
    const { Toast } = await import('./Toast')
    render(<div id="app" />)
    act(() => { Toast.success('操作成功') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('操作成功')
  })

  it('Toast.error 显示错误消息', async () => {
    const { Toast } = await import('./Toast')
    render(<div id="app" />)
    act(() => { Toast.error('操作失败') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('操作失败')
  })

  it('Toast.warning 显示警告消息', async () => {
    const { Toast } = await import('./Toast')
    render(<div id="app" />)
    act(() => { Toast.warning('请注意') })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('请注意')
  })

  it('超过 duration 后消息从 DOM 移除', async () => {
    const { Toast } = await import('./Toast')
    render(<div id="app" />)
    act(() => { Toast.success('临时消息', { duration: 2000 }) })
    await act(async () => { vi.advanceTimersByTime(50) })
    expect(document.body.textContent).toContain('临时消息')
    await act(async () => { vi.advanceTimersByTime(2500) })
    expect(document.body.textContent).not.toContain('临时消息')
  })
})
