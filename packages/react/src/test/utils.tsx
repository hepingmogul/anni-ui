import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '../core/Theme/ThemeProvider'

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider defaultMode="light">{children}</ThemeProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
