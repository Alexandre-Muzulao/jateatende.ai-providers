"use client";
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-3";
import "react-credit-cards-3/dist/es/styles-compiled.css";
import { useMask } from "@react-input/mask";

export function CreditCardForm() {
  const [focus, setFocus] = useState<Focused>("");
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const creditCardMaskRef = useMask({
    mask: "#### #### #### ####",
    replacement: { "#": /\d/ },
  });
  const validateMaskRef = useMask({
    mask: "##/##",
    replacement: { "#": /\d/ },
  });

  const cvcMaskRef = useMask({
    mask: "###",
    replacement: { "#": /\d/ },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Pagamento enviado!");
  }

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setFocus(evt.target.name as Focused);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Cards
          number={form.number}
          expiry={form.expiry}
          cvc={form.cvc}
          name={form.name}
          focused={focus}
          placeholders={{ name: "Nome no cartão" }}
        />
        <label className="block text-sm font-medium mt-4 text-white">
          Nome no cartão
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onFocus={handleInputFocus}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Nome completo"
        />
        <label className="block text-sm font-medium mt-4 text-white">
          Número do cartão
        </label>
        <input
          type="text"
          name="number"
          ref={creditCardMaskRef}
          value={form.number}
          onChange={handleChange}
          onFocus={handleInputFocus}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="0000 0000 0000 0000"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mt-4 text-white">
              Validade
            </label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              ref={validateMaskRef}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
              maxLength={5}
              className="w-full border rounded px-3 py-2"
              placeholder="MM/AA"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mt-4 text-white">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              value={form.cvc}
              ref={cvcMaskRef}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
              maxLength={4}
              className="w-full border rounded px-3 py-2"
              placeholder="CVC"
            />
          </div>
        </div>
      </form>
    </>
  );
}
