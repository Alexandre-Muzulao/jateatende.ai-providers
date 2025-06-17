"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import axios from "axios";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.HEGEMON_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export type PortfolioState = {
  message?: string;
};

export async function savePortfolio(
  prevState: PortfolioState,
  formData: FormData
) {
  console.log("Saving portfolio with formData:", formData);

  const payload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Missing Fields. Failed to Create Invoice.",
  };

  // // Validate form using Zod
  // const validatedFields = CreateInvoice.safeParse({
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // });

  // // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Create Invoice.",
  //   };
  // }

  // // Prepare data for insertion into the database
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  // // Insert data into the database
  // try {
  //   await sql`
  //     INSERT INTO invoices (customer_id, amount, status, date)
  //     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  //   `;
  // } catch (error) {
  //   // If a database error occurs, return a more specific error.
  //   return {
  //     message: "Database Error: Failed to Create Invoice.",
  //   };
  // }

  // // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath("/dashboard/invoices");
  // redirect("/dashboard/invoices");
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciais inválidas.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function registerUser(
  state: { message: any } | undefined,
  formData: FormData
): Promise<{ message: any }> {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: "PROVIDER",
  };

  try {
    const response = await axiosInstance.post("/auth/register", data); // Use the axios instance to make the request

    if (response.status === 200) {
      const { token, user } = response.data; // Extrai o token e o usuário do response

      // Cria um objeto FormData para passar as credenciais para o método authenticate
      const authFormData = new FormData();
      authFormData.append("email", user.email);
      authFormData.append("password", formData.get("password") as string);
      authFormData.append("userId", user._id as string);
      authFormData.append("token", token as string);

      // Redireciona para o dashboard
      redirect("/dashboard");
    } else {
      return {
        message: response.data.message || "Erro ao registrar usuário.",
      };
    }
  } catch (error: any) {
    console.log("Response:", error); // Log the response data

    return {
      message:
        error.response?.data?.message || "Erro ao conectar com o servidor.",
    };
  }
}
