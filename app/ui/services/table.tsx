import Image from 'next/image';
import { UpdateService, DeleteService } from 'app/ui/services/buttons';
import ServiceStatus from '@/app/ui/services/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { listServices } from '@/app/lib/clasmos';

export default async function ServicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // Busca a lista de atendimentos
  const services = await listServices();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {services?.map((service: any) => (
              <div
                key={service._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={service.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${service.name}'s profile picture`}
                      /> */}
                      <p>{service.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{service.email}</p>
                  </div>
                  <ServiceStatus status={service.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(service.amount)}
                    </p>
                    {/* <p>{formatDateToLocal(service.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateService id={service._id} />
                    <DeleteService id={service._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium">Cliente</th>
                <th className="px-3 py-5 font-medium">Tipo de Serviço</th>
                <th className="px-3 py-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {services?.map((service: any) => (
                <tr
                  key={service._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {service.clientId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {service.serviceType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ServiceStatus status={service.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateService id={service._id} />
                      <DeleteService id={service._id} />
                    </div>
                  </td>
                </tr>
              ))}
              {(!services || services.length === 0) && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    Nenhum atendimento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
