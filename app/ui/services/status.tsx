import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type ServiceStatusType =
  | 'SCHEDULED'
  | 'CANCELLED'
  | 'IN_PROGRESS'
  | 'NOT_FINISHED'
  | 'FINISHED'
  | 'WAITING_REVIEW'
  | 'REVIEWED';

const statusConfig: Record<
  ServiceStatusType,
  {
    label: string;
    bgClass: string;
    textClass: string;
    Icon?: React.ElementType;
    iconClass?: string;
  }
> = {
  SCHEDULED: {
    label: 'Agendado',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700',
    Icon: ClockIcon,
    iconClass: 'ml-1 w-4 text-blue-700',
  },
  CANCELLED: {
    label: 'Cancelado',
    bgClass: 'bg-orange-500',
    textClass: 'text-white',
    Icon: CheckIcon,
    iconClass: 'ml-1 w-4 text-white',
  },
  IN_PROGRESS: {
    label: 'Em Andamento',
    bgClass: 'bg-blue-500',
    textClass: 'text-white',
    Icon: CheckIcon,
    iconClass: 'ml-1 w-4 text-white',
  },
  NOT_FINISHED: {
    label: 'Não Finalizado',
    bgClass: 'bg-gray-400',
    textClass: 'text-white',
    Icon: ClockIcon,
    iconClass: 'ml-1 w-4 text-white',
  },
  FINISHED: {
    label: 'Finalizado',
    bgClass: 'bg-green-500',
    textClass: 'text-white',
    Icon: CheckIcon,
    iconClass: 'ml-1 w-4 text-white',
  },
  WAITING_REVIEW: {
    label: 'Aguardando Avaliação',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    Icon: ClockIcon,
    iconClass: 'ml-1 w-4 text-yellow-800',
  },
  REVIEWED: {
    label: 'Avaliado',
    bgClass: 'bg-green-100',
    textClass: 'text-green-700',
    Icon: CheckIcon,
    iconClass: 'ml-1 w-4 text-green-700',
  },
};

const defaultConfig = {
  label: 'Status desconhecido',
  bgClass: 'bg-gray-200',
  textClass: 'text-gray-700',
};

export default function ServiceStatus({ status }: { status: ServiceStatusType }) {
  const config = statusConfig[status] ?? defaultConfig;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        config.bgClass,
        config.textClass
      )}
    >
      {config.label}
      {config.Icon ? <config.Icon className={config.iconClass} /> : null}
    </span>
  );
}
