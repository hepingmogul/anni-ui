import '@testing-library/jest-dom'
import { beforeAll, afterAll } from 'vitest'

// React 18 在 jsdom 里会通过 window error 事件把预期内的抛错二次打印到 stderr。
// 在全局屏蔽这条额外日志，不影响 expect().toThrow() 的正常断言。
const originalConsoleError = console.error.bind(console)
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : ''
    if (
      msg.includes('The above error occurred in the') ||
      msg.includes('Consider adding an error boundary')
    ) {
      return
    }
    originalConsoleError(...args)
  }
})
afterAll(() => {
  console.error = originalConsoleError
})

// jsdom 不实现 window.matchMedia，提供默认 mock（返回 light 系统主题）
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
