import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ServiceStatus({ status }: { status: string }) {
  console.log('ServiceStatus rendered with status:', status);
  
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-grey-500 text-white': status === 'in_progress',
          'bg-blue-500 text-white': status === 'completed',
          'bg-orange-500 text-white': status === 'cancelled',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pendente
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'in_progress' ? (
        <>
          Em Andamento
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Concluído
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          Cancelado
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
