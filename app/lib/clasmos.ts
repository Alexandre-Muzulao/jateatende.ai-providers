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

