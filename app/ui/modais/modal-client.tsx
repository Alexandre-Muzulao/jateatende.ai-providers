import React, { useState } from 'react';
import { Modal } from './modal';
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  whatsapp: string;
  age: string;
  gender: string;
  address: string;
}

interface ModalClientProps {
  open: boolean;
  onClose: () => void;
  onSelectClient: (client: Client) => void;
}

export function ModalClient({ open, onClose, onSelectClient }: ModalClientProps) {
  const [search, setSearch] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [client, setClient] = useState<Client>({
    id: '',
    name: '',
    whatsapp: '',
    age: '',
    gender: '',
    address: '',
  });

  // Simulação de resultado de busca
  const [foundClient, setFoundClient] = useState<Client | null>(null);

  function handleSearch() {
    // Implementar busca real depois
    setFoundClient({
      id: '1',
      name: 'João da Silva',
      whatsapp: '(44) 99999-9999',
      age: '32',
      gender: 'Masculino',
      address: 'Rua Exemplo, 123 - Centro',
    });
  }

  function handleRegisterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setClient({ ...client, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    // Implementar cadastro real depois
    setFoundClient({ ...client, id: 'novo' });
    setShowRegister(false);
  }

  function handleSelect() {
    if (foundClient) {
      onSelectClient(foundClient);
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Buscar Cliente">
      {/* Campo de busca */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome ou CPF"
          className="border rounded px-2 py-1 flex-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={handleSearch}
          aria-label="Buscar cliente"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="ml-2 bg-green-500 hover:bg-green-600 rounded-full p-2 flex items-center justify-center"
          onClick={() => setShowRegister(!showRegister)}
          aria-label="Cadastrar novo cliente"
        >
          <UserPlusIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Cadastro de novo cliente */}
      {showRegister && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              className="border rounded px-2 py-1 w-full"
              value={client.name}
              onChange={handleRegisterChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              className="border rounded px-2 py-1 w-full"
              value={client.whatsapp}
              onChange={handleRegisterChange}
            />
          </div>
          <div className="mb-2 flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Idade</label>
              <input
                type="number"
                name="age"
                className="border rounded px-2 py-1 w-full"
                value={client.age}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Sexo</label>
              <select
                name="gender"
                className="border rounded px-2 py-1 w-full"
                value={client.gender}
                onChange={handleRegisterChange}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Endereço</label>
            <input
              type="text"
              name="address"
              className="border rounded px-2 py-1 w-full"
              value={client.address}
              onChange={handleRegisterChange}
            />
          </div>
          <button
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
            onClick={handleRegister}
          >
            Salvar Cliente
          </button>
        </div>
      )}

      {/* Resultado da busca ou cadastro */}
      {foundClient && !showRegister && (
        <div className="mb-4 p-3 border rounded flex items-center gap-2 bg-gray-50">
          <UserIcon className="w-6 h-6 text-blue-500" />
          <div>
            <div className="font-semibold">{foundClient.name}</div>
            <div className="text-xs text-gray-600">{foundClient.whatsapp} | {foundClient.age} anos | {foundClient.gender}</div>
            <div className="text-xs text-gray-600">{foundClient.address}</div>
          </div>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSelect}
        disabled={!foundClient}
      >
        Selecionar Cliente
      </button>
    </Modal>
  )
}