'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import axios from 'axios';

// Função para obter o token da sessão do usuário
async function getTokenFromSession(): Promise<string | null> {
  // Substitua isso pelo método correto para acessar o token da sessão
  const token = await fetch('/api/session').then((res) => res.json()).then((data) => data.token);
  return token;
}

// Criação do cliente Axios com token dinâmico
async function createAxiosInstance() {
  const token = await getTokenFromSession();
  return axios.create({
    baseURL: `${process.env.CLASMOS_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

export type State = {
  errors?: {
    specialty?: string[];
    serviceDescription?: string[];
    serviceDetails?: string[];
    problemDetails?: string[];
  };
  message?: string | null;
};

// Define o esquema de validação para os campos do formulário
const CreateServiceSchema = z.object({
  specialty: z.string().min(1, { message: 'O campo especialidade é obrigatório.' }),
  serviceDescription: z
    .string()
    .max(1028, { message: 'A descrição do serviço deve ter no máximo 1028 caracteres.' }),
  serviceDetails: z
    .array(
      z.object({
        title: z.string().min(1, { message: 'O título do serviço é obrigatório.' }),
        detail: z
          .string()
          .max(1028, { message: 'O detalhamento do serviço deve ter no máximo 1028 caracteres.' }),
      })
    )
    .min(1, { message: 'Adicione pelo menos um serviço.' }),
  problemDetails: z
    .array(
      z.object({
        title: z.string().min(1, { message: 'O título do problema é obrigatório.' }),
        detail: z
          .string()
          .max(1028, { message: 'O detalhamento do problema deve ter no máximo 1028 caracteres.' }),
      })
    )
    .min(1, { message: 'Adicione pelo menos um problema.' }),
});

export async function createService(prevState: State, formData: FormData) {
  const data = {
    specialty: formData.get('specialty') as string,
    services: JSON.parse(formData.get('services') as string),
    solvedProblems: JSON.parse(formData.get('solvedProblems') as string),
  };

  console.log('Data to be sent:', data);
  

  const validatedFields = CreateServiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/services', validatedFields.data);

    if (response.status === 201) {
      redirect('/dashboard/services');
    } else {
      return {
        message: response.data.message || 'Erro ao criar o serviço.',
      };
    }
  } catch (error: any) {
    return {
      message: error.response?.data?.message || 'Erro ao conectar com o servidor.',
    };
  }
}