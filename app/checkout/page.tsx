import { UserAccountStatus } from "@/@types/enums";
import { getAccessTokenData } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const accessTokenData = await getAccessTokenData();
  if (accessTokenData?.account.status !== UserAccountStatus.POST_REGISTRATION) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600">This is the checkout page.</p>
      <p className="text-gray-600">
        You can implement your checkout logic here.
      </p>
    </div>
  );
}
