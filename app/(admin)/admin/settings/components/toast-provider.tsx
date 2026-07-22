"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: string;
  title: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (title: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ICON_COLOR: Record<ToastVariant, string> = {
  success: "text-[color:var(--success)]",
  error: "text-destructive",
  info: "text-primary",
};

/**
 * Lightweight, self-contained toast provider scoped to the admin Settings
 * page. The project has no global toast system yet, so this stays local to
 * this feature rather than touching app/layout.tsx or introducing a
 * dependency like sonner. Reuses existing design tokens for styling.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (title: string, variant: ToastVariant = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, title, variant }]);
      const timer = setTimeout(() => dismiss(id), 4000);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.variant];
          return (
            <div
              key={toast.id}
              role="status"
              className={cn(
                "pointer-events-auto flex items-center gap-2.5 rounded-xl bg-popover text-popover-foreground ring-1 ring-foreground/10 shadow-lg px-4 py-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", ICON_COLOR[toast.variant])} />
              <p className="text-sm font-medium flex-1 min-w-0">{toast.title}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/** Hook for triggering toasts from anywhere inside the settings page tree. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
