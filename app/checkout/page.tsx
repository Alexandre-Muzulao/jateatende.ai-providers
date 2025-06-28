import Image from "next/image";
import { UserAccountStatus } from "@/@types/enums";
import { getAccessTokenData } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const accessTokenData = await getAccessTokenData();
  if (accessTokenData?.account.status !== UserAccountStatus.POST_REGISTRATION) {
    redirect("/dashboard");
  }

  return (
    <main>
      <nav className="w-full py-4 flex justify-center items-center border-b border-gray-200 mb-8 bg-white">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={40}
          priority
        />
      </nav>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full sm:w-1/4">
          <h1 className="text-2xl font-bold mb-4">Quase lá!</h1>
          <p className="text-gray-600">
            Para começar, escolha seu plano de pagamento para usar todos os
            recursos e benefícios do <strong>JaTeAtende</strong>.
          </p>
        </div>
        <div className="w-full sm:w-1/3"></div>
      </div>
    </main>
  );
}
