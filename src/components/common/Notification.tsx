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
      bg: 'bg-blue-950/70 border-blue-800/60 text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-950/70 border-emerald-800/60 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-950/70 border-amber-800/60 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    },
    alert: {
      bg: 'bg-rose-950/70 border-rose-800/60 text-rose-200',
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    },
  };

  const c = configs[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${c.bg} ${className}`}>
      {c.icon}
      <div className="flex-1">
        {(title || titleHi) && (
          <div className="font-bold mb-0.5 text-white">
            {titleHi && <span className="mr-1 text-emerald-300">{titleHi}</span>}
            {title && <span>{title}</span>}
          </div>
        )}
        <div className="text-xs sm:text-sm leading-relaxed opacity-95">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
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
          className="pointer-events-auto bg-[#0f2119] text-white p-3.5 rounded-xl shadow-2xl border border-[#203f31] flex items-start gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 border border-emerald-500/30">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-white">{notif.title}</h5>
            <p className="text-[#9db3a6] text-[11px] mt-0.5 leading-snug">{notif.message}</p>
            <span className="text-[10px] text-[#6e8a7c] mt-1 block">{notif.timestamp}</span>
          </div>
          <button
            onClick={() => onDismiss(notif.id)}
            className="text-[#8ea598] hover:text-white p-1 cursor-pointer"
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

