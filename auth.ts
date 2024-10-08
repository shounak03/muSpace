// import NextAuth from "next-auth"
// import authConfig from "./auth.config"
// import {PrismaAdapter} from "@auth/prisma-adapter"  
// import { db } from "./lib/db"
// export const { auth, handlers, signIn, signOut } = NextAuth({
//     adapter: PrismaAdapter(db),
//     session: {strategy:"jwt"},
//     ...authConfig,
//     callbacks:{

//         async session({token,session}) {
//             console.log("sessionToken: ",token);
            
//             if(session.user && token.sub){
//                 session.user.id = token.sub
//             }

//             return session
//         },

//         async jwt({token}){
//             return token;
//         }
            
//     }
// })

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      return token
    }
  },
  events: {
    async signOut({ session, token }) {
      // You can add custom logic here if needed
      console.log("User signed out");
    }
  }
})