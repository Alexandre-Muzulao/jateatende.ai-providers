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

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  const [serviceDetails, setServiceDetails] = useState([{ title: '', detail: '' }]);

  const handleAddDetail = () => {
    setServiceDetails([...serviceDetails, { title: '', detail: '' }]);
  };

  const handleDetailChange = (
    index: number,
    field: keyof { title: string; detail: string },
    value: string
  ) => {
    const updatedDetails = [...serviceDetails];
    updatedDetails[index][field] = value;
    setServiceDetails(updatedDetails);
  };

  const handleRemoveDetail = (index: number) => {
    const updatedDetails = serviceDetails.filter((_, i) => i !== index);
    setServiceDetails(updatedDetails);
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

        {/* Problem Details */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium">Quais serviços você presta dessa especialidade?</label>
            <InformationCircleIcon
              className="h-5 w-5 text-gray-500"
              title="Each detail should describe a story about the type of problem the provider solves."
            />
          </div>
          {serviceDetails.map((detail, index) => (
            <div key={index} className="mb-4">
              {/* Title Field */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={detail.title}
                  onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                  required
                />
              </div>
              {/* Detail and Button in the Same Line */}
              <div className="flex items-center gap-4">
                <textarea
                  placeholder="Detail (max 1028 characters)"
                  value={detail.detail}
                  onChange={(e) => handleDetailChange(index, 'detail', e.target.value)}
                  className="flex-1 rounded-md border border-gray-200 py-2 px-3 text-sm"
                  rows={2}
                  maxLength={1028}
                  required
                />
                <Button type="button" onClick={() => handleRemoveDetail(index)}>
                  Esquecer isso!
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={handleAddDetail}>
            Bora por mais um!
          </Button>
        </div>

        {/* Service Images */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Service Images</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-32 w-full rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                <p>Image Carousel Placeholder</p>
              </div>
            </div>
            <Button type="button">Save</Button>
          </div>
        </div> */}

        {/* Problem Details */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium">Quais problemas você acredita que resolve dessa especialidade?</label>
            <InformationCircleIcon
              className="h-5 w-5 text-gray-500"
              title="Each detail should describe a story about the type of problem the provider solves."
            />
          </div>
          {serviceDetails.map((detail, index) => (
            <div key={index} className="mb-4">
              {/* Title Field */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Descreva algo como... (Ar-condicionado não gela, Vazamento de água, Ar-condicionado não liga, etc)"
                  value={detail.title}
                  onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                  required
                />
              </div>
              {/* Detail and Button in the Same Line */}
              <div className="flex items-center gap-4">
                <textarea
                  placeholder="Fala mais sobre... (no máximo 1028 characters)"
                  value={detail.detail}
                  onChange={(e) => handleDetailChange(index, 'detail', e.target.value)}
                  className="flex-1 rounded-md border border-gray-200 py-2 px-3 text-sm"
                  rows={2}
                  maxLength={1028}
                  required
                />
                <Button type="button" onClick={() => handleRemoveDetail(index)}>
                  Esquecer isso!
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={handleAddDetail}>
            Bora por mais um!
          </Button>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Criar Serviço!</Button>
      </div>
    </form>
  );
}
