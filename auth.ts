import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User as BaseUser } from '@/app/lib/definitions';
import type { AdapterUser } from 'next-auth/adapters';

interface User extends Omit<BaseUser, 'token'> {
  role?: string; // Add the 'role' property to the User type
  phone?: string; // Add the 'phone' property to the User type
  token: string; // Ensure the 'token' property is always a string
}

declare module 'next-auth' {

  interface Session {
    user: User;
    accessToken?: string;
  }

  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    accessToken?: string;
  }

  interface AdapterUser extends User {}
}

import bcrypt from 'bcryptjs';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.HEGEMON_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
 
async function authUser(email: string, password: string): Promise<{ user: User; token: string } | undefined> {
  try {
    const data = { email, password };

    const response = await axiosInstance.post('/auth', data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw new Error('Failed to fetch user.');
  }
}

async function getUser(userId: string, token: string): Promise<User | undefined> {
  try {

    const response = await axiosInstance.get('/auth/user-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z.object({
            email: z.string().email(),
            password: z.string().min(6),
          }).safeParse(credentials);

          if (!parsedCredentials.success) {
            console.error('Invalid credentials format:', parsedCredentials.error);
            return null;
          }

          const { email, password } = parsedCredentials.data;

          // Chama o método authUser para autenticar o usuário
          const authResponse = await authUser(email, password);

          if (!authResponse || !authResponse.user || !authResponse.token) {
            console.error('Authentication failed: Invalid response from authUser.');
            return null;
          }

          const { user, token } = authResponse;
          console.log('Token received:', token);  
          // Retorna o usuário autenticado com o token
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token,
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: User }) {

      console.log('JWT callback:', token, user);

      if (user) {
        token.id = user.id || token.id;
        token.name = user.name || token.name;
        token.email = user.email || token.email;
        token.phone = user.phone || token.phone;
        token.role = user.role || token.role;
        token.accessToken = user.token || token.accessToken;

        // Salvar o token no Session Storage
        if (typeof window !== 'undefined' && token.accessToken) {
          sessionStorage.setItem('Token', token.accessToken);
          console.log('Token saved to Session Storage:', token.accessToken);
        }
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {

      console.log('Session callback:', session, token);

      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          role: token.role,
        };

        console.log('Session accessToken:', token.accessToken);
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
});