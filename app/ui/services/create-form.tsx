'use client';

import { ServiceForm } from '@/app/lib/definitions';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { createService, State } from '@/app/lib/clasmos';
import { useActionState } from 'react';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Service {
  service: string;
  detail: string;
}

interface Problem {
  problem: string;
  detail: string;
}

function ServiceList({
  services,
  onAdd,
  onChange,
  onRemove,
}: {
  services: Service[];
  onAdd: () => void;
  onChange: (index: number, field: keyof Service, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Adicione os serviços que você presta</label>
        <InformationCircleIcon className="h-5 w-5 text-gray-500" title="Adicione os serviços que você presta" />
      </div>
      {services.map((service, index) => (
        <div key={index} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Serviço (ex: Instalação de ar-condicionado)"
              value={service.service}
              onChange={(e) => onChange(index, 'service', e.target.value)}
              className="w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <textarea
              placeholder="Detalhes do serviço"
              value={service.detail}
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

function ProblemList({
  problems,
  onAdd,
  onChange,
  onRemove,
}: {
  problems: Problem[];
  onAdd: () => void;
  onChange: (index: number, field: keyof Problem, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Adicione os problemas que você resolve</label>
        <InformationCircleIcon className="h-5 w-5 text-gray-500" title="Adicione os problemas que você resolve" />
      </div>
      {problems.map((problem, index) => (
        <div key={index} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Problema resolvido (ex: Ar-condicionado não gela)"
              value={problem.problem || ''} // Garante que o valor seja sempre uma string
              onChange={(e) => onChange(index, 'problem', e.target.value)}
              className="w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <textarea
              placeholder="Detalhes do problema resolvido"
              value={problem.detail || ''} // Garante que o valor seja sempre uma string
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

export default function Form({ ServiceForm }: { ServiceForm: ServiceForm[] }) {
  const initialState: State = { message: null, errors: { specialty: [], serviceDescription: [], serviceDetails: [], problemDetails: [] } };
  const [state, formAction] = useActionState(createService, initialState);
  const [services, setServices] = useState<Service[]>([{ service: '', detail: '' }]);
  const [solvedProblems, setSolvedProblems] = useState<Problem[]>([{ problem: '', detail: '' }]);

  const handleAddDetail = (setDetails: React.Dispatch<React.SetStateAction<any[]>>) => {
    setDetails((prev) => [...prev, { service: '', detail: '' }]);
  };

  const handleDetailChange = (
    setDetails: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
    field: string,
    value: string
  ) => {
    setDetails((prev) => {
      const updatedDetails = [...prev];
      updatedDetails[index][field] = value;
      return updatedDetails;
    });
  };

  const handleRemoveDetail = (setDetails: React.Dispatch<React.SetStateAction<any[]>>, index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddProblem = () => {
    setSolvedProblems((prev) => [...prev, { problem: '', detail: '' }]); // Adiciona um novo problema vazio
  };

  const handleProblemChange = (index: number, field: keyof Problem, value: string) => {
    setSolvedProblems((prev) => {
      const updatedProblems = [...prev];
      updatedProblems[index][field] = value; // Atualiza apenas os campos `problem` e `detail`
      return updatedProblems;
    });
  };

  const handleRemoveProblem = (index: number) => {
    setSolvedProblems((prev) => prev.filter((_, i) => i !== index)); // Remove o problema pelo índice
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set('specialty', formData.get('specialty') as string);
    formData.set('location', formData.get('location') as string);
    
    const availability = [];
    for (let i = 0; i < 7; i++) {
      const start = formData.get(`availability[${i}][start]`) as string;
      const end = formData.get(`availability[${i}][end]`) as string;
      if (start && end) {
        availability.push({ start, end });
      }
    }

    formData.set('availability', JSON.stringify(availability));
    formData.set('acceptScheduling', formData.get('acceptScheduling') as string);

    formData.set(
      'services',
      JSON.stringify(
        services
          .filter((service) => service.service.trim() !== '' && service.detail.trim() !== '')
          .map(({ service, detail }) => ({ service, detail }))
      )
    );

    formData.set(
      'solvedProblems',
      JSON.stringify(
        solvedProblems
          .filter((problem) => problem.problem.trim() !== '' && problem.detail.trim() !== '')
          .map(({ problem, detail }) => ({ problem, detail }))
      )
    );

    createService(state, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
        
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium">
            Qual região você estará disponível para fazer esse atendimento?
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Selecionar região (ex: Zona Sul, Zona Norte, etc)"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Quais dias e horários você estará disponível para fazer esse atendimento?
          </label>
          <div className="space-y-2">
            {[
              'Domingo',
              'Segunda-feira',
              'Terça-feira',
              'Quarta-feira',
              'Quinta-feira',
              'Sexta-feira',
              'Sábado',
            ].map((day, idx) => (
              <div key={day} className="flex items-center gap-4">
          <label className="w-32 text-sm">{day}</label>
          <input
            type="time"
            name={`availability[${idx}][start]`}
            className="rounded-md border border-gray-200 py-1 px-2 text-sm"
            required={false}
          />
          <span className="text-xs text-gray-500">até</span>
          <input
            type="time"
            name={`availability[${idx}][end]`}
            className="rounded-md border border-gray-200 py-1 px-2 text-sm"
            required={false}
          />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="acceptScheduling" className="block text-sm font-medium">
            Você aceitará agendar serviços?
          </label>
          <select
            id="acceptScheduling"
            name="acceptScheduling"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <ServiceList
          services={services}
          onAdd={() => handleAddDetail(setServices)}
          onChange={(index, field, value) => handleDetailChange(setServices, index, field, value)}
          onRemove={(index) => handleRemoveDetail(setServices, index)}
        />

        <ProblemList
          problems={solvedProblems}
          onAdd={handleAddProblem}
          onChange={handleProblemChange}
          onRemove={handleRemoveProblem}
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
