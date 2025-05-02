import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.HEGEMON_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
 
async function getUser(userId: string, token: string): Promise<User | undefined> {
  try {
    console.log('Fetching user data...', userId, token)

      const response = await axiosInstance.post(
      '/auth/user-data',
      { userId }, // Corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      }
    );

    console.log('/auth/user-data: ', response.data)

    return response.data; // Assuming the API returns the user data in the response body
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), userId: z.string(), token: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
 
          const { email, password, userId, token } = parsedCredentials.data;

          const user = await getUser(userId, token);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});