import Image from 'next/image';
import Reviews from './reviews';

type ClientReviewProps = {
  img: string;         // URL da imagem do cliente
  rating: number;      // Nota da avaliação
  count?: number;      // Quantidade de avaliações (opcional)
  feedback: string;    // Texto do feedback do cliente
  name?: string;       // Nome do cliente (opcional)
};

export default function ClientReview({ img, rating, count, feedback, name }: ClientReviewProps) {
  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg bg-white shadow-sm">
      <Image
        src={img}
        alt={name || 'Foto do cliente'}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div className="flex-1">
        <Reviews rating={rating} count={count} />
        <p className="mt-2 text-gray-700 text-sm">{feedback}</p>
        {name && <span className="block mt-1 text-xs text-gray-500">{name}</span>}
      </div>
    </div>
  );
}