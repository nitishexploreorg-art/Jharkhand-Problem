import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X, Bell } from 'lucide-react';
import { NotificationItem } from '../../types';

export interface AlertBoxProps {
  type?: 'info' | 'success' | 'warning' | 'alert';
  title?: string;
  titleHi?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  type = 'info',
  title,
  titleHi,
  children,
  onClose,
  className = '',
}) => {
  const configs = {
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    },
    alert: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    },
  };

  const c = configs[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${c.bg} ${className}`}>
      {c.icon}
      <div className="flex-1">
        {(title || titleHi) && (
          <div className="font-bold mb-0.5">
            {titleHi && <span className="mr-1">{titleHi}</span>}
            {title && <span>{title}</span>}
          </div>
        )}
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded-md text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export interface NotificationToastProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const NotificationToastStack: React.FC<NotificationToastProps> = ({
  notifications,
  onDismiss,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.slice(0, 3).map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 flex items-start gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-slate-100">{notif.title}</h5>
            <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">{notif.message}</p>
            <span className="text-[10px] text-slate-400 mt-1 block">{notif.timestamp}</span>
          </div>
          <button
            onClick={() => onDismiss(notif.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  // Safe container rendered from App
  return null;
};

