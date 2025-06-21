"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import axios from "axios";
import { scheduler } from "timers/promises";

// Função para obter o token da sessão do usuário
async function getTokenFromSession(): Promise<string | null> {
  try {
    // Obtém o token diretamente do Session Storage no cliente
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("Token") : null;
    console.log("Token from Session Storage:", token);
    return token;
  } catch (error) {
    console.error("Error fetching token from Session Storage:", error);
    return null;
  }
}

// Criação do cliente Axios com token dinâmico
async function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.CLASMOS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export type State = {
  errors?: {
    location?: string[];
    schedule?: {
      initialWeekDay?: string;
      finalWeekDay?: string;
      initialHour?: string;
      finalHour?: string;
    }[];
    availableOutsideSchedule?: string[];
    specialties?: {
      specialty?: string;
      services?: {
        service?: string;
        detail?: string;
      }[];
      solvedProblems?: {
        problem?: string;
        detail?: string;
      }[];
    }[];
  };
  message?: string | null;
};

// Define o esquema de validação para os campos do formulário
const CreateServiceSchema = z.object({
  location: z
    .string()
    .min(1, { message: "O campo localização é obrigatório." }),
  schedule: z
    .array(
      z.object({
        initialWeekDay: z
          .string()
          .min(1, { message: "O dia inicial é obrigatório." }),
        finalWeekDay: z
          .string()
          .min(1, { message: "O dia final é obrigatório." }),
        initialHour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          message: "Horário inicial inválido.",
        }),
        finalHour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          message: "Horário final inválido.",
        }),
      })
    )
    .min(1, { message: "Adicione pelo menos um horário de disponibilidade." }),
  availableOutsideSchedule: z.enum(["true", "false"], {
    message: "Selecione uma opção válida para agendamento.",
  }),
  specialties: z
    .array(
      z.object({
        specialty: z
          .string()
          .min(1, { message: "O campo especialidade é obrigatório." }),
        services: z
          .array(
            z.object({
              service: z
                .string()
                .min(1, { message: "O título do serviço é obrigatório." }),
              detail: z.string().max(1028, {
                message:
                  "O detalhamento do serviço deve ter no máximo 1028 caracteres.",
              }),
            })
          )
          .min(1, { message: "Adicione pelo menos um serviço." }),
        solvedProblems: z
          .array(
            z.object({
              problem: z
                .string()
                .min(1, { message: "O título do problema é obrigatório." }),
              detail: z.string().max(1028, {
                message:
                  "O detalhamento do problema deve ter no máximo 1028 caracteres.",
              }),
            })
          )
          .min(1, { message: "Adicione pelo menos um problema." }),
      })
    )
    .min(1, { message: "Adicione pelo menos uma especialidade." }),
});

export async function createService(prevState: State, formData: FormData) {
  const data = {
    location: formData.get("location") as string,
    schedule: JSON.parse(formData.get("schedule") as string), // Adiciona o campo schedule
    availableOutsideSchedule: formData.get("availableOutsideSchedule"), // Converte para booleano
    specialties: JSON.parse(formData.get("specialties") as string), // Adiciona o campo specialties
  };

  const validatedFields = CreateServiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post(
      "/service-providers",
      validatedFields.data
    );

    if (response.status === 201) {
      redirect("/dashboard/services");
    } else {
      return {
        message: response.data.message || "Erro ao criar o serviço.",
      };
    }
  } catch (error: any) {
    console.error("Error creating service:", error);
    return {
      message:
        error.response?.data?.message || "Erro ao conectar com o servidor.",
    };
  }
}
