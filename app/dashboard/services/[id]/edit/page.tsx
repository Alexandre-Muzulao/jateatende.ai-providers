import Form from '@/app/ui/services/edit-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';

import { getServiceById } from '@/app/lib/clasmos';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // CORRETO: acesso assíncrono
  const { id } = await params;
  const [service, customers] = await Promise.all([
    getServiceById(id),
    fetchCustomers(), 
  ]);
  if (!service) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Atendimento', href: '/dashboard/services' },
          {
            label: 'Atualizar Atendimento',
            href: `/dashboard/services/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form service={service} customers={customers} />
    </main>
  );
}