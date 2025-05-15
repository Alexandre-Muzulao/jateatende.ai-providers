'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn} from '@/auth';
import { AuthError } from 'next-auth';
import { stringify } from 'querystring';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.CLASMOS_URL}`,
  headers: {
    'Content-Type': 'application/json'
    }
})

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: 
    z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'],{
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// export async function createService(
//   state: { message: any } | undefined,
//   formData: FormData
// ): Promise<{ message: any }> {

//   const data = {
//     name: formData.get('name'),
//     phone: formData.get('phone'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     role: 'PROVIDER',
//   };

//   try {
//     const response = await axiosInstance.post('/auth/register', data); // Use the axios instance to make the request
    
//     if (response.status === 200) {
//       const { token, user } = response.data; // Extrai o token e o usuário do response

//       // Cria um objeto FormData para passar as credenciais para o método authenticate
//       const authFormData = new FormData();
//       authFormData.append('email', user.email);
//       authFormData.append('password', formData.get('password') as string);
//       authFormData.append('userId', user._id as string);
//       authFormData.append('token', token as string);

//       localStorage.setItem('authToken', token); // Armazena o token no localStorage
//       // Redireciona para o dashboard
//       redirect('/dashboard');
//     } else {
//       return {
//         message: response.data.message || 'Erro ao registrar usuário.',
//       };
//     }
//   } catch (error: any) {
//     console.log('Response:', error); // Log the response data

//     return {
//       message: error.response?.data?.message || 'Erro ao conectar com o servidor.',
//     };
//   }
// }

const CreateService = FormSchema.omit({ id: true, date: true });

export async function createService(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateService.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

   const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: 'PROVIDER',
  };

  try {
    const response = await axiosInstance.post('/auth/register', data); // Use the axios instance to make the request
    
    if (response.status === 200) {
      const { token, user } = response.data; // Extrai o token e o usuário do response

      // Cria um objeto FormData para passar as credenciais para o método authenticate
      const authFormData = new FormData();
      authFormData.append('email', user.email);
      authFormData.append('password', formData.get('password') as string);
      authFormData.append('userId', user._id as string);
      authFormData.append('token', token as string);

      localStorage.setItem('authToken', token); // Armazena o token no localStorage
      // Redireciona para o dashboard
      redirect('/dashboard');
    } else {
      return {
        message: response.data.message || 'Erro ao registrar usuário.',
      };
    }
  } catch (error: any) {
    console.log('Response:', error); // Log the response data

    return {
      message: error.response?.data?.message || 'Erro ao conectar com o servidor.',
    };
  }
  
  
}