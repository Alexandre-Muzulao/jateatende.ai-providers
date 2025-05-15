'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Detail {
  title: string;
  detail: string;
}

function DynamicDetailList({
  details,
  onAdd,
  onChange,
  onRemove,
  titlePlaceholder,
  detailPlaceholder,
  tooltip,
}: {
  details: Detail[];
  onAdd: () => void;
  onChange: (index: number, field: keyof Detail, value: string) => void;
  onRemove: (index: number) => void;
  titlePlaceholder: string;
  detailPlaceholder: string;
  tooltip: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium">{tooltip}</label>
        <InformationCircleIcon className="h-5 w-5 text-gray-500" title={tooltip} />
      </div>
      {details.map((detail, index) => (
        <div key={index} className="mb-4">
          {/* Title Field */}
          <div className="mb-2">
            <input
              type="text"
              placeholder={titlePlaceholder}
              value={detail.title}
              onChange={(e) => onChange(index, 'title', e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>
          {/* Detail and Button in the Same Line */}
          <div className="flex items-center gap-4">
            <textarea
              placeholder={detailPlaceholder}
              value={detail.detail}
              onChange={(e) => onChange(index, 'detail', e.target.value)}
              className="flex-1 rounded-md border border-gray-200 py-2 px-3 text-sm"
              rows={2}
              maxLength={1028}
              required
            />
            <Button type="button" onClick={() => onRemove(index)}>
              Esquecer isso!
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={onAdd}>
        Bora por mais um!
      </Button>
    </div>
  );
}

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  const [serviceDetails, setServiceDetails] = useState<Detail[]>([{ title: '', detail: '' }]);
  const [problemDetails, setProblemDetails] = useState<Detail[]>([{ title: '', detail: '' }]);

  const handleAddDetail = (setDetails: React.Dispatch<React.SetStateAction<Detail[]>>) => {
    setDetails((prev) => [...prev, { title: '', detail: '' }]);
  };

  const handleDetailChange = (
    setDetails: React.Dispatch<React.SetStateAction<Detail[]>>,
    index: number,
    field: keyof Detail,
    value: string
  ) => {
    setDetails((prev) => {
      const updatedDetails = [...prev];
      updatedDetails[index][field] = value;
      return updatedDetails;
    });
  };

  const handleRemoveDetail = (
    setDetails: React.Dispatch<React.SetStateAction<Detail[]>>,
    index: number
  ) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Service Name */}
        <div className="mb-4">
          <label htmlFor="specialty" className="block text-sm font-medium">
            Qual nome você daria para a especialidade desse serviço?
          </label>
          <input
            id="specialty"
            name="specialty"
            type="text"
            placeholder="Descreva algo como... (Refrigeração, Ar-Condicionado, Mecânica, etc)"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>

        {/* Service Description */}
        <div className="mb-4">
          <label htmlFor="serviceDescription" className="block text-sm font-medium">
            Como você pesquisaria sobre esse serviço?
          </label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            placeholder="Conta ai com mais detalhes... (no máximo 1028 characters)"
            maxLength={1028}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            rows={3}
            required
          />
        </div>

        {/* Service Details */}
        <DynamicDetailList
          details={serviceDetails}
          onAdd={() => handleAddDetail(setServiceDetails)}
          onChange={(index, field, value) => handleDetailChange(setServiceDetails, index, field, value)}
          onRemove={(index) => handleRemoveDetail(setServiceDetails, index)}
          titlePlaceholder="Título (ex: Instalação de Ar-condicionado, etc)"
          detailPlaceholder="Fala mais sobre... (no máximo 1028 characters)"
          tooltip="Quais serviços você presta dessa especialidade?"
        />

        {/* Problem Details */}
        <DynamicDetailList
          details={problemDetails}
          onAdd={() => handleAddDetail(setProblemDetails)}
          onChange={(index, field, value) => handleDetailChange(setProblemDetails, index, field, value)}
          onRemove={(index) => handleRemoveDetail(setProblemDetails, index)}
          titlePlaceholder="Descreva algo como... (Ar-condicionado não gela, Vazamento de água, etc)"
          detailPlaceholder="Fala mais sobre... (no máximo 1028 characters)"
          tooltip="Quais problemas você acredita que resolve dessa especialidade?"
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/services"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Criar Serviço!</Button>
      </div>
    </form>
  );
}
