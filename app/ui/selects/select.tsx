import React from 'react';

interface Option {
  value: string;
  label: string;
  color?: string; // Tailwind class or hex
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  colorByValue?: boolean; // Se true, aplica cor de fundo conforme opção selecionada
}

export function Select({ options, value, onChange, colorByValue = false, className = '', ...props }: SelectProps) {
  // Busca a cor da opção selecionada, se houver
  const selectedOption = options.find(opt => opt.value === value);
  let bgColor = '';
  if (colorByValue && selectedOption?.color) {
    // Tailwind: bg-blue-500, bg-red-500, etc.
    bgColor = selectedOption.color;
  }

  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-full px-3 py-1 text-xs font-semibold text-white transition focus:ring-2 focus:ring-blue-400 ${bgColor} ${className}`}
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="text-black">
          {opt.label}
        </option>
      ))}
    </select>
  );
}