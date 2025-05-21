'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { cookies } from 'next/headers';

// Função para obter o token da sessão do usuário
async function getTokenFromSession(): Promise<string | null> {
  try {
    // Obtém o token diretamente dos cookies
    const token = (await cookies()).get('authjs.session-token')?.value || null;
    console.log('Token from cookies:', token);
    return token;
  } catch (error) {
    console.error('Error fetching token from session:', error);
    return null;
  }
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
    services?: object;
    solvedProblems?: object[];
  };
  message?: string | null;
};

// Define o esquema de validação para os campos do formulário
const CreateServiceSchema = z.object({
  specialty: z.string().min(1, { message: 'O campo especialidade é obrigatório.' }),
  services: z
    .array(
      z.object({
        service: z.string().min(1, { message: 'O título do serviço é obrigatório.' }),
        detail: z
          .string()
          .max(1028, { message: 'O detalhamento do serviço deve ter no máximo 1028 caracteres.' }),
      })
    )
    .min(1, { message: 'Adicione pelo menos um serviço.' }),
  solvedProblems: z
    .array(
      z.object({
        problem: z.string().min(1, { message: 'O título do problema é obrigatório.' }),
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

  const validatedFields = CreateServiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(validatedFields.data)

  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/service-providers', validatedFields.data);
    console.log('Response from server:', response);

    if (response.status === 201) {
      redirect('/dashboard/services');
    } else {
      return {
        message: response.data.message || 'Erro ao criar o serviço.',
      };
    }
  } catch (error: any) {
    console.error('Error creating service:', error);
    return {
      message: error.response?.data?.message || 'Erro ao conectar com o servidor.',
    };
  }
}