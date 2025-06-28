"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import axios from "axios";
import { auth } from "@/auth";

async function httpClient() {
  const token = (await auth())?.accessToken!;
  return axios.create({
    baseURL: process.env.CLASMOS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

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
  availableOutsideSchedule: z.boolean({
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

export type State = z.infer<typeof CreateServiceSchema> & {
  errors: Record<string, string[]>;
  message: string;
};

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
      message: "Erro de validação.",
      location: prevState.location,
      schedule: prevState.schedule,
      availableOutsideSchedule: prevState.availableOutsideSchedule,
      specialties: prevState.specialties,
    };
  }

  try {
    const axiosInstance = await httpClient();
    const response = await axiosInstance.post(
      "/service-providers",
      validatedFields.data
    );

    if (response.status === 201) {
      redirect("/dashboard/portifolios");
    } else {
      return {
        ...prevState,
        errors: {},
        message: response.data?.message || "Erro ao criar o serviço.",
        location: prevState.location,
        schedule: prevState.schedule,
        availableOutsideSchedule: prevState.availableOutsideSchedule,
        specialties: prevState.specialties,
      };
    }
  } catch (error: any) {
    console.error("Error creating service:", error);
    return {
      ...prevState,
      errors: {},
      message:
        error.response?.data?.message || "Erro ao conectar com o servidor.",
      location: prevState.location,
      schedule: prevState.schedule,
      availableOutsideSchedule: prevState.availableOutsideSchedule,
      specialties: prevState.specialties,
    };
  }
}
