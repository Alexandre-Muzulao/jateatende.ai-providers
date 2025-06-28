import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "axios";
import { JWT } from "next-auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.HEGEMON_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const { auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
  },
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
    async jwt({ token, user }) {
      if (user && user.token) {
        token.accessToken = user.token; // Salva o JWT como accessToken
      }
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          role: token.role,
        } as any;

        session.accessToken = (token as JWT).accessToken;
      }
      return session;
    },
  },
});
