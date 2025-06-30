type DateTimeFormattedProps = {
  value: string | Date;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export default function DateTimeFormatted({
  value,
  locale = 'pt-BR',
  options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
}: DateTimeFormattedProps) {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return <span>Data inválida</span>;

  return <span>{date.toLocaleString(locale, options)}</span>;
}