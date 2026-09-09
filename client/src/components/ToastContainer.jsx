import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: 'calc(100% - 48px)',
      pointerEvents: 'none',
    }}>
      {toasts.map((toast) => {
        let icon = <Info size={20} color="#3B82F6" />;
        let border = '1px solid #BFDBFE';
        let bg = '#EFF6FF';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={20} color="#10B981" />;
          border = '1px solid #A7F3D0';
          bg = '#ECFDF5';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={20} color="#EF4444" />;
          border = '1px solid #FECACA';
          bg = '#FEF2F2';
        }

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              background: bg,
              border: border,
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.25s ease-out forwards',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {icon}
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                padding: '4px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
