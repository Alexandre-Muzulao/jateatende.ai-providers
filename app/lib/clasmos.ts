'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import axios from 'axios';

// Função para obter o token da sessão do usuário
async function getTokenFromSession(): Promise<string | null> {
  try {
    // Obtém o token diretamente do Session Storage no cliente
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('Token') : null;
    console.log('Token from Session Storage:', token);
    return token;
  } catch (error) {
    console.error('Error fetching token from Session Storage:', error);
    return null;
  }
}

// Criação do cliente Axios com token dinâmico
async function createAxiosInstance() {
  // const token = await getTokenFromSession();
  const token = `eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SoujWlfl6t2aMkiZ.ehB9BggRmOJar4gSpMNSSRBrjh2qvrtvELkZKe0E2GcrBbq1dKby67gpjkCOhJ8mdRj6pkrOhl-DjqI6-7imdvHI9cxWh8aKzilE4_3jYXCEdqAoe9StiJASnEHOnNq0XUZZo9sgdat4Uwepk2Qc6gm1NOVU4JAc1ly5s83VqD4llQyc258cDNaPz9w68gJqSMKq59672cL-csU.dunWgOgaCX1O7E5nmws2fA`

  console.log('Token used for Axios instance:', token);

  return axios.create({
    baseURL: `http://localhost:3003`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

export type State = {
  errors?: {
    specialty?: string[];
    location?: string[];
    availability?: object[];
    acceptScheduling?: boolean
    services?: object;
    solvedProblems?: object[];
  };
  message?: string | null;
};

// Define o esquema de validação para os campos do formulário
const CreateServiceSchema = z.object({
  specialty: z.string().min(1, { message: 'O campo especialidade é obrigatório.' }),
  location: z.string().min(1, { message: 'O campo localização é obrigatório.' }),
  availability: z
    .array(
      z.object({
        start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Horário inicial inválido.' }),
        end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Horário final inválido.' }),
      })
    )
    .min(1, { message: 'Adicione pelo menos um dia de disponibilidade.' }),
  acceptScheduling: z.enum(['true', 'false'], { message: 'Selecione uma opção válida para agendamento.' }),
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
    location: formData.get('location') as string,
    availability: JSON.parse(formData.get('availability') as string),
    acceptScheduling: formData.get('acceptScheduling') as string,
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
    console.log(axiosInstance)
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