import JateatendeLogo from '@/app/ui/jateatende-logo';
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
 
export default function RegisterPage() {
  return (
    <main className="flex items-center bg-black justify-center md:h-screen">
      <div className="relative mx-auto bg-blackflex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-36">
          <div className="w-32 text-white md:w-60">
            <JateatendeLogo />
          </div>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}