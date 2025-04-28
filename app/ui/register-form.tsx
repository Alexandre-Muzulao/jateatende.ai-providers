'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  PhoneArrowDownLeftIcon,
  KeyIcon,
  UserCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { registerUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';


export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3 text-white">
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Registre-se.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="name"
            >
              Nome Completo
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Preencha seu nome completo"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="phone"
            >
              WhatsApp
            </label>
            <div className="relative">
              <input
                autoComplete="tel"
                className="peer block w-full rounded-md border border-black py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="phone"
                type="tellephone"
                name="phone"
                placeholder="Preencha seu WhatsApp"
                required
              />
              <PhoneArrowDownLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-black py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Informe seu e-mail"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-black py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Informe sua senha"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" type="submit" aria-disabled={isPending}>
          {isPending ? 'Registrando...' : 'Registrar'}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage?.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
