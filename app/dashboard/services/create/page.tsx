import Form from '@/app/ui/services/create-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Atencimentos', href: '/dashboard/services' },
          {
            label: 'Novo Atendimento',
            href: '/dashboard/services/create',
            active: true,
          },
        ]}
      />
      <Form customers={[]}/>
    </main>
  );
}