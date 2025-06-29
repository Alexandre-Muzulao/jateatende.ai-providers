import Form from '@/app/ui/services/edit-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';

import { getServiceById } from '@/app/lib/clasmos';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: { id: string } }) {
  const id = props.params.id;
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