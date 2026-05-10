'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const iconMap = {
    success: <CheckCircle2 size={16} className="text-accent shrink-0" />,
    error: <AlertCircle size={16} className="text-danger shrink-0" />,
    warning: <AlertTriangle size={16} className="text-warning shrink-0" />,
    info: <CheckCircle2 size={16} className="text-secondary shrink-0" />,
  }

  const borderMap = {
    success: 'border-accent/30',
    error: 'border-danger/30',
    warning: 'border-warning/30',
    info: 'border-border',
  }

  return (
    <div
      className={`
        pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-[10px]
        bg-card border ${borderMap[toast.type]} shadow-2xl
        transition-all duration-300 ease-out min-w-[280px] max-w-[400px]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {iconMap[toast.type]}
      <span className="text-sm text-primary flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-muted hover:text-secondary transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
