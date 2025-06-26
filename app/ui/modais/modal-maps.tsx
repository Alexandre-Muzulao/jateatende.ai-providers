import React, { useRef } from 'react';
import { Modal } from './modal';

// Você pode integrar o Google Maps JS API ou um iframe customizado aqui
interface MapModalProps {
  open: boolean;
  onClose: () => void;
  onSelectAddress: (address: string, lat: number, lng: number) => void;
}

export function MapModal({ open, onClose, onSelectAddress }: MapModalProps) {
  // Exemplo fictício: substitua por integração real do Google Maps
  const addressRef = useRef<HTMLInputElement>(null);

  function handleSelect() {
    // Simulação: pegue o endereço e coordenadas do input ou do mapa
    onSelectAddress(addressRef.current?.value || '', -25.4284, -49.2733);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Buscar Endereço no Mapa">
      <div className="mb-4">
        {/* Aqui você pode renderizar o mapa real */}
        <input
          ref={addressRef}
          type="text"
          placeholder="Digite ou selecione o endereço"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSelect}
      >
        Selecionar Endereço
      </button>
    </Modal>
  );
}