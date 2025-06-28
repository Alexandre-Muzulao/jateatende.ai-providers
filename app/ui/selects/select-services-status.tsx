import React from 'react';

import { Select } from './select';

// Opções de status com suas cores e descrições
const statusOptions = [
  { value: 'AGENDADO', label: 'Agendado', color: 'bg-blue-500' },
  { value: 'CANCELADO', label: 'Cancelado', color: 'bg-red-500' },
  { value: 'EM_ANDAMENTO', label: 'Em andamento', color: 'bg-yellow-500' },
  { value: 'NAO_FINALIZADO', label: 'Não finalizado', color: 'bg-orange-500' },
  { value: 'ENCERRADO', label: 'Encerrado', color: 'bg-green-500' },
  { value: 'AGUARDANDO_AVALIACAO', label: 'Aguardando avaliação', color: 'bg-purple-500' },
  { value: 'AVALIADO', label: 'Avaliado', color: 'bg-teal-500' },
];

interface SelectServicesStatusProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SelectServicesStatus({ value, onChange, className }: SelectServicesStatusProps) {
  return (
    <Select
      options={statusOptions}
      value={value}
      onChange={e => onChange(e.target.value)}
      colorByValue
      className={className}
      aria-label="Selecione o status do serviço"
    />
  );
}