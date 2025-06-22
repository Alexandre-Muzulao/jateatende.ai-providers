import Form from '@/app/ui/services/create-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Services', href: '/dashboard/services' },
          {
            label: 'Problema que eu resolvo!',
            href: '/dashboard/services/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}