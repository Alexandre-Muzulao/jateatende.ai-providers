"use client";
import { useState } from "react";

export function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode implementar a lógica de envio
    alert("Pagamento enviado!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-6 rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold mb-2">Dados do Cartão</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Nome no cartão</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Nome completo"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Número do cartão
        </label>
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          required
          maxLength={19}
          className="w-full border rounded px-3 py-2"
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Validade</label>
          <input
            type="text"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            required
            maxLength={5}
            className="w-full border rounded px-3 py-2"
            placeholder="MM/AA"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input
            type="text"
            name="cvc"
            value={form.cvc}
            onChange={handleChange}
            required
            maxLength={4}
            className="w-full border rounded px-3 py-2"
            placeholder="CVC"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold mt-2 hover:bg-blue-700 transition"
      >
        Pagar e iniciar
      </button>
    </form>
  );
}
