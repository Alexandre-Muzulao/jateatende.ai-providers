import {
  CreditCardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Minhas Assinaturas
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="mt-4 rounded-md bg-yellow-100 border border-yellow-300 p-4 text-yellow-800">
          <strong>Sua assinatura está desativada.</strong> Com isso, seu
          portfólio não será exibido nas buscas dos usuários. Ative sua
          assinatura para começar a desfrutar de todos os benefícios e recursos
          da JaTeAtende!
        </div>
      </div>

      {/* Métodos de pagamento */}
      <div className="mt-8 w-full">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Método de Pagamento
        </h2>
        <div className="flex items-center gap-6">
          {/* Boleto */}
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="boleto"
              className="sr-only"
              defaultChecked
            />
            <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50 hover:border-blue-500 transition">
              {/* Ícone de boleto */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="4"
                  y="6"
                  width="16"
                  height="12"
                  rx="2"
                  strokeWidth="2"
                />
                <path d="M8 10h8M8 14h8" strokeWidth="2" />
              </svg>
            </span>
            <span className="mt-2 text-sm text-white">Boleto</span>
          </label>
          {/* Cartão de Crédito */}
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cartao"
              className="sr-only"
            />
            <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50 hover:border-blue-500 transition">
              {/* Ícone de cartão de crédito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="10"
                  rx="2"
                  strokeWidth="2"
                />
                <path d="M2 11h20" strokeWidth="2" />
              </svg>
            </span>
            <span className="mt-2 text-sm text-white">Cartão de Crédito</span>
          </label>
        </div>
      </div>

      <div className="mt-5 w-full">
        <button className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Ativar Assinatura
        </button>
      </div>
    </div>
  );
}
