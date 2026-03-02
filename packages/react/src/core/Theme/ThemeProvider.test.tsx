import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './ThemeProvider'

const ThemeConsumer = () => {
  const { mode, setMode, toggle, theme } = useTheme()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setMode('dark')}>切换暗色</button>
      <button onClick={() => setMode('light')}>切换亮色</button>
      <button onClick={() => setMode('system')}>跟随系统</button>
      <button onClick={toggle}>切换</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  describe('默认模式', () => {
    it('defaultMode="light" 时 html 无 dark 类', () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      expect(document.documentElement).not.toHaveClass('dark')
    })

    it('defaultMode="light" 时 mode 为 light', () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      expect(screen.getByTestId('mode')).toHaveTextContent('light')
    })
  })

  describe('切换模式', () => {
    it('切换到 dark 后 html 添加 dark 类', async () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('切换暗色'))
      expect(document.documentElement).toHaveClass('dark')
    })

    it('切换回 light 后 dark 类移除', async () => {
      render(
        <ThemeProvider defaultMode="dark">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('切换亮色'))
      expect(document.documentElement).not.toHaveClass('dark')
    })

    it('toggle 从 light 切换到 dark', async () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('切换'))
      expect(document.documentElement).toHaveClass('dark')
    })

    it('toggle 从 dark 切换到 light', async () => {
      render(
        <ThemeProvider defaultMode="dark">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('切换'))
      expect(document.documentElement).not.toHaveClass('dark')
    })

    it('setMode("system") 将 mode 设置为 system', async () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('跟随系统'))
      expect(screen.getByTestId('mode')).toHaveTextContent('system')
    })
  })

  describe('localStorage 持久化', () => {
    it('切换后 localStorage 存储正确值', async () => {
      render(
        <ThemeProvider defaultMode="light" storageKey="test-theme">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByText('切换暗色'))
      expect(localStorage.getItem('test-theme')).toBe('dark')
    })

    it('从 localStorage 读取初始值', () => {
      localStorage.setItem('test-theme', 'dark')
      render(
        <ThemeProvider defaultMode="light" storageKey="test-theme">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    })
  })

  describe('useTheme', () => {
    it('useTheme 返回 theme、mode、setMode、toggle', () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeConsumer />
        </ThemeProvider>,
      )
      expect(screen.getByTestId('mode')).toBeInTheDocument()
      expect(screen.getByTestId('theme')).toBeInTheDocument()
      expect(screen.getByText('切换暗色')).toBeInTheDocument()
      expect(screen.getByText('切换')).toBeInTheDocument()
    })

    it('在 ThemeProvider 外使用 useTheme 抛出错误', () => {
      const ErrorComponent = () => {
        useTheme()
        return null
      }
      expect(() => render(<ErrorComponent />)).toThrow(
        'useTheme must be used within a <ThemeProvider>',
      )
    })
  })
})
