"use client";

import { PaymentCycle, PaymentMethod } from "@/@types/enums";
import { useState } from "react";
import { CreditCardForm } from "./credit-card-form";

export default function CheckoutForm() {
  const plans = [
    {
      recommended: false,
      value: PaymentCycle.MONTHLY,
      name: "Mensal",
      price: 100,
      description: "A cada mês",
    },
    {
      recommended: true,
      value: PaymentCycle.QUARTERLY,
      name: "Trimestral",
      price: 250,
      description: "A cada 3 meses",
    },
    {
      recommended: false,
      value: PaymentCycle.ANNUAL,
      name: "Anual",
      price: 900,
      description: "Anualmente",
    },
  ];

  const paymentMethods = [
    {
      value: PaymentMethod.CREDIT_CARD,
      name: "Cartão de Crédito",
    },
    {
      value: PaymentMethod.BANK_SLIP,
      name: "Boleto Bancário",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(PaymentCycle.QUARTERLY);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethod.CREDIT_CARD
  );

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="col-span-3 md:col-span-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Quase lá!</h1>
        <p className="text-white mb-6">
          Para começar, escolha seu plano de pagamento para usar todos os
          recursos e benefícios do <strong>JaTeAtende</strong>.
        </p>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">
            Método de pagamento
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => {
              return (
                <div
                  key={method.value}
                  className="flex items-center p-4 border rounded-lg cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.value}
                    className="mr-2"
                    checked={selectedPaymentMethod === method.value}
                    onChange={() => setSelectedPaymentMethod(method.value)}
                  />
                  <span className="text-white">{method.name}</span>
                </div>
              );
            })}
          </div>
          <h2 className="text-xl font-bold mb-4 text-white">
            Ciclo de pagamento
          </h2>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.value;
            const titleColor = isSelected ? "text-green-700" : "text-gray-700";
            const priceColor = isSelected ? "text-green-900" : "text-gray-900";
            const placeholderColor = isSelected
              ? "text-green-600"
              : "text-gray-600";

            return (
              <div
                onClick={() => setSelectedPlan(plan.value)}
                className={
                  "rounded-lg p-4 border-2 flex flex-col items-center shadow-lg relative" +
                  (isSelected
                    ? " bg-green-100  border-green-500"
                    : " bg-gray-100  border-gray-500")
                }
                key={plan.value}
              >
                <input
                  type="radio"
                  className="absolute left-4 cursor-pointer text-green"
                  name="payment-plan"
                  onChange={() => setSelectedPlan(plan.value)}
                  checked={isSelected}
                />
                {plan.recommended && (
                  <span className="absolute -top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Recomendado
                  </span>
                )}
                <span className={`font-semibold ${titleColor}`}>
                  {plan.name}
                </span>
                <span className={`text-2xl font-bold ${priceColor}`}>
                  {plan.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className={`text-xs ${placeholderColor}`}>
                  {plan.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-3 md:col-span-1 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">
          Dados de pagamento
        </h2>
        <CreditCardForm />
        <h2 className="text-xl font-bold my-4 text-white">
          Termos e Condições
        </h2>
        <p className="text-white">
          Ao iniciar sua assinatura, você concorda com os nossos{" "}
          <a
            href="/terms"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a
            href="/privacy"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </a>
        </p>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold mt-2 hover:bg-green-700 transition"
        >
          Iniciar assinatura
        </button>
      </div>
    </div>
  );
}
