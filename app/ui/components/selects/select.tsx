import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  color?: string; // Tailwind class or hex
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ options, value, onChange, className = '' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex w-full justify-end">
      <div ref={ref} className={`relative inline-block w-48 ${className}`}>
        {/* Botão do select */}
        <button
          type="button"
          className="w-full rounded-full px-3 py-1 text-xs font-semibold bg-white text-black border border-gray-300 transition focus:ring-2 focus:ring-blue-400 flex items-center justify-between"
          onClick={() => setOpen(o => !o)}
        >
          <span className="flex items-center">
            {selectedOption?.color && (
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedOption?.color?.startsWith('bg-') ? selectedOption.color : ''}`}
                style={
                  selectedOption?.color && !selectedOption.color.startsWith('bg-')
                    ? { backgroundColor: selectedOption.color }
                    : {}
                }
              >
                {/* Se usar Tailwind, pode adicionar a classe dinamicamente */}
              </span>
            )}
            {selectedOption?.label ?? 'Selecione...'}
          </span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {/* Dropdown */}
        {open && (
          <ul className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
            {options.map(opt => (
              <li
                key={opt.value}
                className={`cursor-pointer px-3 py-2 text-xs font-semibold flex items-center text-black hover:bg-gray-100 ${opt.value === value ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.color && (
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${opt.color.startsWith('bg-') ? opt.color : ''}`}
                    style={
                      opt.color && !opt.color.startsWith('bg-')
                        ? { backgroundColor: opt.color }
                        : {}
                    }
                  />
                )}
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}