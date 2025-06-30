import React from 'react';

import { Select } from './select';

// Opções de status com suas cores e descrições
const statusOptions = [
  { value: 'SCHEDULED', label: 'Agendado', color: 'bg-blue-500' },
  { value: 'CANCELLED', label: 'Cancelado', color: 'bg-red-500' },
  { value: 'IN_PROGRESS', label: 'Em andamento', color: 'bg-yellow-500' },
  { value: 'NOT_FINISHED', label: 'Não finalizado', color: 'bg-orange-500' },
  { value: 'FINISHED', label: 'Encerrado', color: 'bg-green-500' },
  { value: 'WAITING_REVIEW', label: 'Aguardando avaliação', color: 'bg-purple-500' },
  { value: 'REVIEWED', label: 'Avaliado', color: 'bg-teal-500' },
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
      onChange={onChange}
      className={className}
      aria-label="Selecione o status do serviço"
    />
  );
}