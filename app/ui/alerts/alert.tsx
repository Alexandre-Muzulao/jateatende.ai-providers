import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type AlertType = 'success' | 'error' | 'warning' | 'info';

const alertColors: Record<AlertType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};

interface AlertProps {
  open: boolean;
  type?: AlertType;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onClick?: () => void;
  durationMs?: number; // tempo em ms, padrão 7000
}

export function Alert({
  open,
  type = 'info',
  title,
  subtitle,
  onClose,
  onClick,
  durationMs = 7000,
}: AlertProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [open, onClose, durationMs]);

  if (!open) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 min-w-[280px] max-w-xs shadow-lg rounded-lg text-white ${alertColors[type]} cursor-pointer`}
      onClick={onClick}
      role="alert"
    >
      <div className="flex items-start p-4">
        <div className="flex-1">
          <div className="font-bold text-base">{title}</div>
          {subtitle && <div className="text-sm mt-1">{subtitle}</div>}
        </div>
        <button
          className="ml-4 mt-1 text-white hover:text-gray-200"
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fechar alerta"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}