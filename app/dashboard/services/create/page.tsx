import Form from "@/app/ui/services/create-form";
import Breadcrumbs from "@/app/ui/services/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Serviços", href: "/dashboard/services" },
          {
            label: "Problema que eu resolvo!",
            href: "/dashboard/services/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
