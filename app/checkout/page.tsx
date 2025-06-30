import Image from "next/image";
import { UserAccountStatus } from "@/@types/enums";
import { getAccessTokenData, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import CheckoutForm from "../ui/checkout/checkout-form";

export default async function CheckoutPage() {
  const accessTokenData = await getAccessTokenData();
  if (accessTokenData?.account.status !== UserAccountStatus.POST_REGISTRATION) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-black min-h-screen ">
      <nav className="w-full py-4 flex justify-center items-center mb-8 relative">
        <Image
          src="/images/logo-light.png"
          alt="Logo"
          width={120}
          height={40}
          priority
        />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            className="absolute right-4 p-2 rounded hover:bg-primary transition"
            title="Sair"
          >
            <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-white" />
          </button>
        </form>
      </nav>
      <CheckoutForm />
    </main>
  );
}
