'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { MapModal } from '@/app/ui/modais/modal-maps';
import { MapIcon } from '@heroicons/react/24/outline';

type ServiceType =
  | 'CLEANING'
  | 'PLUMBING'
  | 'ELECTRICAL'
  | 'CARPENTRY'
  | 'PAINTING'
  | 'GARDENING'
  | 'MOVING'
  | 'APPLIANCE_REPAIR'
  | 'IT_SUPPORT'
  | 'SECURITY';

interface Location {
  latitude: number;
  longitude: number;
}

interface CustomFields {
  anoConstrucao?: number;
  quantidadeTomadas?: number;
  [key: string]: any;
}

interface FormState {
  address: string;
  clientId: string;
  providerId: string;
  serviceType: ServiceType;
  description: string;
  scheduledTime: string;  
  location: Location;
  price: number;
  additionalInfo: string;
  attachments: File[];
  tags: string;
  customFields: CustomFields;
}

const initialState: FormState = {
  clientId: '',
  providerId: '',
  serviceType: 'ELECTRICAL',
  description: '',
  scheduledTime: '',
  address: '',
  location: { latitude: 0, longitude: 0 },
  price: 0,
  additionalInfo: '',
  attachments: [],
  tags: '',
  customFields: {
    anoConstrucao: undefined,
    quantidadeTomadas: undefined,
  },
};

const serviceTypes = [
  { value: 'CLEANING', label: 'Limpeza' },
  { value: 'PLUMBING', label: 'Hidráulica' },
  { value: 'ELECTRICAL', label: 'Elétrica' },
  { value: 'CARPENTRY', label: 'Marcenaria' },
  { value: 'PAINTING', label: 'Pintura' },
  { value: 'GARDENING', label: 'Jardinagem' },
  { value: 'MOVING', label: 'Mudança' },
  { value: 'APPLIANCE_REPAIR', label: 'Conserto de Eletrodomésticos' },
  { value: 'IT_SUPPORT', label: 'Suporte de Informática' },
  { value: 'SECURITY', label: 'Segurança' },
];

export default function Form() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  // Exemplo de clientes para o modal
  const clientes = [
    { id: 'user-909', name: 'João da Silva' },
    { id: 'user-910', name: 'Maria Oliveira' },
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (name === 'address') { 
      alert(`${e.target.value}`)
    }
    if (name === 'latitude' || name === 'longitude') {
      setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === 'price') {
      setForm((prev) => ({ ...prev, price: parseFloat(value) }));
    } else if (name === 'anoConstrucao' || name === 'quantidadeTomadas') {
      setForm((prev) => ({
        ...prev,
        customFields: {
          ...prev.customFields,
          [name]: value ? Number(value) : undefined,
        },
      }));
    } else if (name === 'attachments') {
      const files = (e.target as HTMLInputElement).files;
      setForm((prev) => ({
        ...prev,
        attachments: files ? Array.from(files) : [],
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    }
  }

  function handleSelectClient(cliente: { id: string; name: string }) {
    setForm((prev) => ({ ...prev, clientId: cliente.id }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Aqui você pode enviar os dados para sua API/backend
    // Exemplo: await fetch('/api/appointments', { method: 'POST', body: JSON.stringify({ ... }) });

    setTimeout(() => {
      setSubmitting(false);
      alert(
        'Atendimento criado com sucesso!\n\n' +
          JSON.stringify(
            {
              ...form,
              tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
            },
            null,
            2
          )
      );
      setForm(initialState);
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Novo Atendimento</h2>

      {/* Cliente */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="clientId" className="block text-sm font-medium">
            Cliente
          </label>
        </div>
        <input
          id="clientId"
          name="clientId"
          type="text"
          placeholder="ID do cliente"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.clientId}
          onChange={handleChange}
          required
        />
      </div>

      {/* Modal de seleção de cliente */}
      <MapModal
        open={showClientModal}
        onClose={() => setShowClientModal(false)}
        onSelectAddress={(address: string, lat: number, lng: number) => {
          setForm((prev) => ({
            ...prev,
            address,
            location: { latitude: lat, longitude: lng },
          }));
          setShowClientModal(false);
        }}
      />      

      {/* Prestador */}
      <div className="mb-4">
        <label htmlFor="providerId" className="block text-sm font-medium">
          Prestador
        </label>
        <input
          id="providerId"
          name="providerId"
          type="text"
          placeholder="ID do prestador"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.providerId}
          onChange={handleChange}
          required
        />
      </div>

      {/* Tipo de Serviço */}
      <div className="mb-4">
        <label htmlFor="serviceType" className="block text-sm font-medium">
          Tipo de Serviço
        </label>
        <select
          id="serviceType"
          name="serviceType"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.serviceType}
          onChange={handleChange}
          required
        >
          {serviceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Descrição */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Descrição do Atendimento
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Descreva o serviço a ser realizado"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Data/Hora Agendada */}
      <div className="mb-4">
        <label htmlFor="scheduledTime" className="block text-sm font-medium">
          Data e Hora Agendada
        </label>
        <input
          id="scheduledTime"
          name="scheduledTime"
          type="datetime-local"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.scheduledTime}
          onChange={handleChange}
          required
        />
      </div>

      {/* Endedereço */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium">
          Endedereço
        </label>
        <div className="relative">
          <input
            id="address"
            name="address"
            type="text"
            step="0.01"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 pr-10 text-sm"
            value={form.address}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            onClick={() => setShowClientModal(true)}
            tabIndex={-1}
            aria-label="Selecionar endereço no mapa"
          >
            <MapIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Preço */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Preço (R$)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Informações Adicionais */}
      <div className="mb-4">
        <label htmlFor="additionalInfo" className="block text-sm font-medium">
          Informações Adicionais
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Ex: Verificar tomadas, disjuntores e fiação."
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          rows={2}
          value={form.additionalInfo}
          onChange={handleChange}
        />
      </div>

      {/* Anexos */}
      <div className="mb-4">
        <label htmlFor="attachments" className="block text-sm font-medium">
          Anexos
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          className="block w-full text-sm"
          onChange={handleChange}
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags (separadas por vírgula)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="revisão, elétrica, preventiva"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          value={form.tags}
          onChange={handleChange}
        />
      </div>

      {/* Campos customizados */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label htmlFor="anoConstrucao" className="block text-sm font-medium">
            Ano de Construção
          </label>
          <input
            id="anoConstrucao"
            name="anoConstrucao"
            type="number"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            value={form.customFields.anoConstrucao ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="quantidadeTomadas" className="block text-sm font-medium">
            Quantidade de Tomadas
          </label>
          <input
            id="quantidadeTomadas"
            name="quantidadeTomadas"
            type="number"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            value={form.customFields.quantidadeTomadas ?? ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/atendimentos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Criando...' : 'Criar Atendimento'}
        </Button>
      </div>
    </form>
  );
}

