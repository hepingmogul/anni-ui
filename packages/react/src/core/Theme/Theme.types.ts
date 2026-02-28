export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  /** 当前实际渲染的主题（system 解析后的真实值） */
  theme: 'light' | 'dark'
  /** 用户设置的模式，含 system 选项 */
  mode: ThemeMode
  /** 切换主题模式 */
  setMode: (mode: ThemeMode) => void
  /** 快捷切换：在 light / dark 之间来回切换 */
  toggle: () => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  /** 默认主题模式，默认为 'system' */
  defaultMode?: ThemeMode
  /** localStorage 持久化 key，默认为 'react-theme' */
  storageKey?: string
}
