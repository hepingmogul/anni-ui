import { Moon, Sun } from 'lucide-react'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { useTheme } from './index'
import BadgePage from './pages/BadgePage'
import BreadcrumbPage from './pages/BreadcrumbPage'
import ButtonPage from './pages/ButtonPage'
import CardPage from './pages/CardPage'
import CheckboxPage from './pages/CheckboxPage'
import DividerPage from './pages/DividerPage'
import FormPage from './pages/FormPage'
import IndexPage from './pages/IndexPage'
import InputPage from './pages/InputPage'
import InputNumberPage from './pages/InputNumberPage'
import RadioPage from './pages/RadioPage'
import SliderPage from './pages/SliderPage'
import SpacePage from './pages/SpacePage'
import SpinnerPage from './pages/SpinnerPage'
import SwitchPage from './pages/SwitchPage'
import TabsPage from './pages/TabsPage'
import ToastPage from './pages/ToastPage'

const navItems = [
  { label: '总览', path: '/' },
  { label: '基础', type: 'group' },
  { label: 'Button', path: '/button' },
  { label: '布局', type: 'group' },
  { label: 'Space', path: '/space' },
  { label: 'Divider', path: '/divider' },
  { label: '表单', type: 'group' },
  { label: 'Form', path: '/form' },
  { label: 'Input', path: '/input' },
  { label: 'InputNumber', path: '/input-number' },
  { label: 'Checkbox', path: '/checkbox' },
  { label: 'Radio', path: '/radio' },
  { label: 'Switch', path: '/switch' },
  { label: 'Slider', path: '/slider' },
  { label: '数据展示', type: 'group' },
  { label: 'Badge', path: '/badge' },
  { label: 'Card', path: '/card' },
  { label: '反馈', type: 'group' },
  { label: 'Spinner', path: '/spinner' },
  { label: 'Toast', path: '/toast' },
  { label: '导航', type: 'group' },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Breadcrumb', path: '/breadcrumb' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-3 w-full text-sm text-neutral-500 hover:text-neutral-900 transition-colors border-t border-neutral-200"
      aria-label={theme === 'dark' ? '切换为明亮模式' : '切换为暗黑模式'}
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      {theme === 'dark' ? '明亮模式' : '暗黑模式'}
    </button>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* 侧边导航 */}
      <aside className="w-48 shrink-0 border-r border-neutral-200 bg-surface flex flex-col">
        <div className="px-4 py-5 border-b border-neutral-100">
          <span className="font-bold text-neutral-900 text-sm">React UI</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item, i) =>
            item.type === 'group' ? (
              <p key={i} className="px-4 pt-4 pb-1 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                {item.label}
              </p>
            ) : (
              <NavLink
                key={item.path}
                to={item.path!}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `block px-4 py-1.5 text-sm rounded-md mx-2 transition-colors ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-900 font-medium'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <ThemeToggle />
      </aside>

      {/* 内容区域 */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>

    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="button" element={<ButtonPage />} />
        <Route path="badge" element={<BadgePage />} />
        <Route path="breadcrumb" element={<BreadcrumbPage />} />
        <Route path="card" element={<CardPage />} />
        <Route path="checkbox" element={<CheckboxPage />} />
        <Route path="divider" element={<DividerPage />} />
        <Route path="form" element={<FormPage />} />
        <Route path="input" element={<InputPage />} />
        <Route path="input-number" element={<InputNumberPage />} />
        <Route path="radio" element={<RadioPage />} />
        <Route path="slider" element={<SliderPage />} />
        <Route path="space" element={<SpacePage />} />
        <Route path="spinner" element={<SpinnerPage />} />
        <Route path="switch" element={<SwitchPage />} />
        <Route path="tabs" element={<TabsPage />} />
        <Route path="toast" element={<ToastPage />} />
      </Route>
    </Routes>
  )
}
