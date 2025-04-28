import { WrenchIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function JateatendeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[2em]">Já te Atende.AI!</p>
    </div>
  );
}
