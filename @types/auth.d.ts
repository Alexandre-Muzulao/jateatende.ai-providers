import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role?: string | null;
    token?: string | null; // Adiciona o token ao User
  }

  export interface Session {
    user: User & DefaultSession["user"];
    accessToken?: string;
  }

  export interface JWT {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    accessToken?: string;
  }
}
