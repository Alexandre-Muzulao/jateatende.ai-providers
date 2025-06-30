'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { MapModal } from '@/app/ui/components/modais/modal-maps';
import { MapIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { ModalClient } from '@/app/ui/components/modais/modal-client';
import { ModalClient as ModalProvider } from '@/app/ui/components/modais/modal-prestador';
import { SelectServicesStatus } from '@/app/ui/components/selects/select-services-status';
import { createService } from '@/app/lib/clasmos';
import { Alert } from '@/app/ui/components/alerts/alert';

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
  clientName: string;
  providerId: string;
  providerName: string;
  serviceType: ServiceType;
  description: string;
  scheduledTime: string;  
  location: Location;
  price: number;
  additionalInfo: string;
  attachments: File[];
  tags: string;
  customFields: CustomFields;
  status?: string;
}

const initialState: FormState = {
  clientId: '',
  clientName: '',
  providerId: '',
  providerName: '',
  serviceType: 'CLEANING',
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
  status: '',
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
  const [showClientSearchModal, setShowClientSearchModal] = useState(false);
  const [showProviderSearchModal, setShowProviderSearchModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [alert, setAlert] = useState<{
    open: boolean;
    type?: 'success' | 'error' | 'warning' | 'info';
    title: string;
    subtitle?: string;
  }>({ open: false, type: 'info', title: '', subtitle: '' });

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
      window.alert(`${e.target.value}`)
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
      const formatted = formatBRL(value);
      setPriceInput(formatted);
      // Se quiser salvar o valor numérico no form:
      setForm(prev => ({ ...prev, price: Number(value.replace(/\D/g, ' ')) }));
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

  // Adicione o handler para o status
  function handleStatusChange(value: string) {
    setForm((prev) => ({ ...prev, status: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Monta o objeto para envio, ajustando tags e removendo campos desnecessários
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(',').map((t) => t.trim()).filter(Boolean).join(',')
        : '',
      price: typeof form.price === 'string'
        ? Number((form.price as string).replace(/\D/g, '')) / 100
        : form.price,
      status: form.status ?? 'AGENDADO',
    };

    const result = await createService(payload);

    setSubmitting(false);

    if (result.success) {
      setAlert({
        open: true,
        type: 'success',
        title: 'Atendimento criado com sucesso!',
        subtitle: 'O atendimento foi registrado e está disponível na lista.',
      });
      setForm(initialState);
    } else {
      setAlert({
        open: true,
        type: 'error',
        title: 'Erro ao criar atendimento',
        subtitle: result.message || 'Ocorreu um erro ao criar o atendimento.',
      });
      console.error(result.errors);
    }
  }

  function formatBRL(value: string) {
    const cleaned = value.replace(/\D/g, '');
    const number = Number(cleaned) / 100;
    // Gera o valor e garante o espaço após o R$
    return number
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      .replace('R$', 'R$ ');
  }

  return (
    <>
      <Alert
        open={alert.open}
        type={alert.type}
        title={alert.title}
        subtitle={alert.subtitle}
        onClose={() => setAlert(a => ({ ...a, open: false }))}
      />
      <form onSubmit={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Título e Status Select */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Novo Atendimento</h2>
          <SelectServicesStatus
            value={form.status || ''}
            onChange={handleStatusChange}
          />
        </div>

        {/* Cliente */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="clientName" className="block text-sm font-medium">
              Cliente
            </label>
          </div>
          <div className="relative">
            <input
              id="clientName"
              name="clientName"
              type="text"
              placeholder="Nome do cliente"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 pr-10 text-sm"
              value={form.clientName}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
              onClick={() => setShowClientSearchModal(true)}
              tabIndex={-1}
              aria-label="Buscar cliente"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal de busca de cliente */}
        <ModalClient
          open={showClientSearchModal}
          onClose={() => setShowClientSearchModal(false)}
          onSelectClient={(cliente) => {
            setForm((prev) => ({
              ...prev,
              clientId: cliente.id,
              clientName: cliente.name,
            }));
            setShowClientSearchModal(false);
          }}
        />

        {/* Prestador */}
        <div className="mb-4">
          <label htmlFor="providerName" className="block text-sm font-medium">
            Prestador
          </label>
          <div className="relative">
            <input
              id="providerName"
              name="providerName"
              type="text"
              placeholder="Nome do prestador"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 pr-10 text-sm"
              value={form.providerName}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
              onClick={() => setShowProviderSearchModal(true)}
              tabIndex={-1}
              aria-label="Buscar prestador"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal de busca de prestador */}
        <ModalProvider
          open={showProviderSearchModal}
          onClose={() => setShowProviderSearchModal(false)}
          onSelectClient={(prestador) => {
            setForm((prev) => ({
              ...prev,
              providerId: prestador.id,
              providerName: prestador.name,
            }));
            setShowProviderSearchModal(false);
          }}
        />

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

        {/* Endereço */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">
            Endereço
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
              onClick={() => setShowMapModal(true)}
              tabIndex={-1}
              aria-label="Selecionar endereço no mapa"
            >
              <MapIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal do mapa para buscar endereço */}
        <MapModal
          open={showMapModal}
          onClose={() => setShowMapModal(false)}
          onSelectAddress={(address: string, lat: number, lng: number) => {
            setForm((prev) => ({
              ...prev,
              address,
              location: { latitude: lat, longitude: lng },
            }));
            setShowMapModal(false);
          }}
        />

        {/* Preço */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Preço (R$)
          </label>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="R$ 0,00"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            value={priceInput}
            onChange={e => {
              const formatted = formatBRL(e.target.value);
              setPriceInput(formatted);
              setForm(prev => ({ ...prev, price: Number(e.target.value.replace(/\D/g, '')) }));
            }}
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

        {/* Botões */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/services"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Criando...' : 'Criar Atendimento'}
          </Button>
        </div>
      </form>
    </>
  );
}

