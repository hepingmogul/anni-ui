import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  X,
} from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { cn } from '../utils/cn'
import type { ToastItem, ToastOptions, ToastType } from './Toast.types'

const typeConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-success-light border-success text-success-fg',
    iconClassName: 'text-success',
  },
  error: {
    icon: XCircle,
    className: 'bg-danger-light border-danger text-danger-fg',
    iconClassName: 'text-danger',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warning-light border-warning text-warning-fg',
    iconClassName: 'text-warning',
  },
  info: {
    icon: Info,
    className: 'bg-info-light border-info text-info-fg',
    iconClassName: 'text-info',
  },
}

let addToast: ((item: ToastItem) => void) | null = null

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    addToast = (item: ToastItem) => {
      setToasts((prev) => [...prev, item])
      setTimeout(() => remove(item.id), item.duration ?? 3000)
    }
    return () => {
      addToast = null
    }
  }, [remove])

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((toast) => {
        const config = typeConfig[toast.type]
        const IconComponent = config.icon
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-lg border shadow-md text-sm animate-in fade-in slide-in-from-right-2',
              config.className,
            )}
          >
            <IconComponent size={16} className={cn('mt-0.5 shrink-0', config.iconClassName)} />
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => remove(toast.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

let containerMounted = false

function ensureContainer() {
  if (containerMounted) return
  containerMounted = true
  const el = document.createElement('div')
  el.id = 'react-toast-root'
  document.body.appendChild(el)
  createRoot(el).render(<ToastContainer />)
}

function show(message: string, type: ToastType = 'info', options: ToastOptions = {}) {
  ensureContainer()
  const id = Math.random().toString(36).slice(2)
  setTimeout(() => {
    addToast?.({ id, type, message, duration: options.duration ?? 3000 })
  }, 0)
}

export const Toast = {
  show: (message: string, options?: ToastOptions) => show(message, 'info', options),
  success: (message: string, options?: ToastOptions) => show(message, 'success', options),
  error: (message: string, options?: ToastOptions) => show(message, 'error', options),
  warning: (message: string, options?: ToastOptions) => show(message, 'warning', options),
  info: (message: string, options?: ToastOptions) => show(message, 'info', options),
}
