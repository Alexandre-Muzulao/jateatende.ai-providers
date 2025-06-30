import { StarIcon } from '@heroicons/react/24/solid';

type ReviewsProps = {
  rating?: number; // nota média, ex: 4.5 (agora pode ser undefined)
  count?: number; // quantidade de avaliações (opcional)
};

export default function Reviews({ rating, count }: ReviewsProps) {
  const safeRating = typeof rating === 'number' ? rating : 0;

  // Gera as estrelas (1 a 6)
  const stars = Array.from({ length: 6 }, (_, i) => (
    <StarIcon
      key={i}
      className={
        i < Math.round(safeRating)
          ? 'w-5 h-5 text-yellow-400'
          : 'w-5 h-5 text-gray-300'
      }
      aria-hidden="true"
    />
  ));

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">{stars}</div>
      <span className="text-sm font-medium text-gray-900">
        {typeof rating === 'number' ? safeRating.toFixed(1) : '--'}
      </span>
      {typeof count === 'number' && (
        <span className="text-xs text-gray-500">({count} avaliações)</span>
      )}
    </div>
  );
}