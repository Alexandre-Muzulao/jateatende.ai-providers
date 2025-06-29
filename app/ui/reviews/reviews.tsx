import { StarIcon } from '@heroicons/react/24/solid';

type ReviewsProps = {
  rating: number; // nota média, ex: 4.5
  count?: number; // quantidade de avaliações (opcional)
};

export default function Reviews({ rating, count }: ReviewsProps) {
  // Gera as estrelas (1 a 6)
  const stars = Array.from({ length: 6 }, (_, i) => (
    <StarIcon
      key={i}
      className={
        i < Math.round(rating)
          ? 'w-5 h-5 text-yellow-400'
          : 'w-5 h-5 text-gray-300'
      }
      aria-hidden="true"
    />
  ));

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">{stars}</div>
      <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
      {typeof count === 'number' && (
        <span className="text-xs text-gray-500">({count} avaliações)</span>
      )}
    </div>
  );
}