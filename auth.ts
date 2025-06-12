import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User as BaseUser } from "@/app/lib/definitions";
import axios from "axios";

interface User extends Omit<BaseUser, "token"> {
  role?: string; // Add the 'role' property to the User type
  phone?: string; // Add the 'phone' property to the User type
  token: string; // Ensure the 'token' property is always a string
}

declare module "next-auth" {
  // interface Session {
  //   user: User;
  //   accessToken?: string;
  // }
  // interface JWT {
  //   id?: string;
  //   name?: string;
  //   email?: string;
  //   phone?: string;
  //   role?: string;
  //   accessToken?: string;
  // }
  // interface AdapterUser extends User {}
}

const axiosInstance = axios.create({
  baseURL: `${process.env.HEGEMON_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getUser(
  userId: string,
  token: string
): Promise<User | undefined> {
  try {
    console.log("Fetching user data...", userId, token);

    const response = await axiosInstance.get("/auth/user-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("/auth/user-data: ", response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(6).max(32),
            })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            throw new Error(
              "Invalid credentials format: " + parsedCredentials.error
            );
          }

          const { email, password } = parsedCredentials.data;
          const { data } = await axiosInstance.post("/auth", {
            email,
            password,
          });

          if (!data || !data.user || !data.token) {
            throw new Error(
              "Invalid response from authUser: " + JSON.stringify(data)
            );
          }

          const { user, token } = data;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt(data) {
    //   if (data.user) {
    //     token.id = data.user.id;
    //     token.name = data.user.name;
    //     token.email = data.user.email;
    //     token.phone = data.user.phone;
    //     token.role = data.user.role;
    //     token.accessToken = data.user.token;
    //   }
    //   return token;
    // },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          role: token.role,
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
