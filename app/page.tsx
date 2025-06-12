import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';


export default function Page() {
  return (
    <main style={{ backgroundImage: 'url(/jateatende-hero-desktop.png)', }} className="min-h-screen bg-cover bg-no-repeat bg-center">

      <div className="relative flex h-16 items-center justify-between container mx-auto">
        <img
          src="/images/logo-linear-light.png"
          width="150"
          alt="Logo"
        />

        <Link href="/register" className='text-white font-bold inline flex items-center gap-2 bg-primary rounded-full px-4 py-2 hover:bg-secondary transition-all duration-300'>
          Criar conta
          <ArrowRightIcon className='w-4 h-4' />
        </Link>
      </div>
      <div className="container mx-auto relative">
        <div className='max-w-[400px] mx-auto md:mx-0 space-y-2.5 p-4 md:mt-32'>
            <LoginForm />
        </div>
      </div>
    </main>
  );
}
