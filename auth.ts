import NextAuth, { CredentialsSignin } from "next-auth"
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);

          if (!email || !password) {
            throw new CredentialsSignin({cause:"Please provide both email and password"});
          }

          const user = await prisma.user.findUnique({
            where: { email: email }
          });

          if (!user) {
            throw new CredentialsSignin({cause:"User not found"});
          }
          //@ts-ignore
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new CredentialsSignin({cause: "Invalid email or password"});
          }

          return { id: user.id, name: user.username, email: user.email };
        } catch (error:any) {
          throw new CredentialsSignin({cause:error.message});
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
});