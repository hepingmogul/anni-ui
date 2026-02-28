import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ThemeContextValue, ThemeMode, ThemeProviderProps } from './Theme.types'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = 'react-theme',
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      return (localStorage.getItem(storageKey) as ThemeMode) ?? defaultMode
    } catch {
      return defaultMode
    }
  })

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    return mode === 'system' ? resolveSystemTheme() : mode
  }, [mode])

  // 同步 class 到 <html>
  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  // 监听系统主题变化（仅 mode === 'system' 时有效）
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next)
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        // ignore
      }
    },
    [storageKey],
  )

  const toggle = useCallback(() => {
    setMode(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setMode])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: resolvedTheme, mode, setMode, toggle }),
    [resolvedTheme, mode, setMode, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}
