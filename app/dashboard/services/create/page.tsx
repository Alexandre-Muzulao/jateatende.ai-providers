import Form from '@/app/ui/portifolios/create-form';
import Breadcrumbs from '@/app/ui/portifolios/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Services', href: '/dashboard/portifolios' },
          {
            label: 'Problema que eu resolvo!',
            href: '/dashboard/portifolios/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}