import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import Link from 'next/link';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <main className="flex items-center bg-black justify-center md:h-screen">
      <div className="relative mx-auto  w-full max-w-[400px]  p-4 md:-mt-32">
        <Link href="/" title='Go Home'>
          <AcmeLogo lightMode />
        </Link>

        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}