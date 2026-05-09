import React, { createContext, useContext, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, Zap } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info' | 'xp';

export interface MobileToast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToastContextType {
  showToast: (toast: Omit<MobileToast, 'id'>) => void;
  showXpToast: (amount: number, action: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useMobileToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useMobileToast must be used within MobileToastProvider');
  return ctx;
}

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const variantConfig: Record<ToastVariant, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  error: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  xp: { icon: Zap, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
};

// ─── Individual Toast ─────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }: { toast: MobileToast; onDismiss: () => void }) {
  const variant = toast.variant || 'info';
  const { icon: Icon, color, bg, border } = variantConfig[variant];

  // Auto-dismiss
  React.useEffect(() => {
    const t = setTimeout(onDismiss, toast.duration ?? 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`flex items-start gap-3 p-3.5 rounded-2xl border glass-strong shadow-2xl w-[calc(100vw-2rem)] max-w-sm ${border}`}
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-secondary transition-colors shrink-0 touch-active"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </motion.div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function MobileToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<MobileToast[]>([]);

  const showToast = useCallback((toast: Omit<MobileToast, 'id'>) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev.slice(-2), { ...toast, id }]); // max 3 toasts
  }, []);

  const showXpToast = useCallback((amount: number, action: string) => {
    showToast({
      variant: 'xp',
      title: `+${amount} XP Earned! ⚡`,
      description: action,
      duration: 3000,
    });
  }, [showToast]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showXpToast }}>
      {children}
      {/* Toast Stack */}
      <div className="fixed bottom-24 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 lg:bottom-8 lg:right-6 lg:left-auto lg:items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onDismiss={() => dismiss(toast.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
