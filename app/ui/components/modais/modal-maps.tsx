import React, { useState } from 'react';
import { Modal } from './modal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { fetchCepData } from '../../../lib/utils';

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  onSelectAddress: (address: string, lat: number, lng: number) => void;
}

export function MapModal({ open, onClose, onSelectAddress }: MapModalProps) {
  const [baseAddress, setBaseAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [referencia, setReferencia] = useState('');

  function formatCep(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  }

  async function handleCepSearch() {
    const data = await fetchCepData(cep);
    if (data) {
      // Adiciona vírgula entre logradouro e bairro
      const base = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
      setBaseAddress(base.trim());
      if (numero) {
        setSelectedAddress(`${data.logradouro}, ${numero}, ${data.bairro} - ${data.localidade}/${data.uf}`.trim());
      } else {
        setSelectedAddress(base.trim());
      }
    } else {
      setBaseAddress('');
      setSelectedAddress('Endereço não encontrado');
    }
  }

  // Sempre que o número mudar, reconstrua o endereço
  React.useEffect(() => {
    if (baseAddress && baseAddress !== 'Endereço não encontrado') {
      if (numero) {
        // Atualiza para considerar a vírgula entre logradouro e bairro
        const match = baseAddress.match(/^(.+?), (.+ - .+)$/);
        if (match) {
          const logradouro = match[1];
          const resto = match[2];
          setSelectedAddress(`${logradouro}, ${numero}, ${resto}`.trim());
        } else {
          setSelectedAddress(`${baseAddress}, ${numero}`.trim());
        }
      } else {
        setSelectedAddress(baseAddress);
      }
    }
  }, [numero, baseAddress]);

  function handleSelect() {
    let address = selectedAddress;
    if (referencia) {
      address = `${address} (Ref: ${referencia})`;
    }
    onSelectAddress(address, -25.4284, -49.2733);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Buscar Endereço no Mapa">
      {/* Linha de CEP, lupa, número e referência */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="CEP"
          className="border rounded px-2 py-1"
          style={{ width: 100 }}
          maxLength={9}
          value={cep}
          onChange={e => setCep(formatCep(e.target.value))}
        />
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={handleCepSearch}
          aria-label="Buscar CEP"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-black" />
        </button>
        <input
          type="text"
          placeholder="Número"
          className="border rounded px-2 py-1"
          style={{ width: 80 }}
          value={numero}
          onChange={e => setNumero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ponto de referência"
          className="border rounded px-2 py-1 flex-1"
          value={referencia}
          onChange={e => setReferencia(e.target.value)}
        />
      </div>

      {/* Espaço para o mapa */}
      {/* <div className="w-full h-56 bg-gray-100 rounded mb-4 flex items-center justify-center">
        <span className="text-gray-400">Mapa de referência</span>
      </div> */}

      {/* Endereço selecionado */}
      <label className="block text-sm font-medium mb-4">
        Endereço selecionado:{' '}
        <span className="font-semibold">
          {selectedAddress || 'Nenhum endereço selecionado'}
        </span>
      </label>

      <button
        className="bg-warning text-white px-4 py-2 rounded"
        onClick={handleSelect}
        disabled={!selectedAddress}
      >
        Selecionar Endereço
      </button>
    </Modal>
  );
}