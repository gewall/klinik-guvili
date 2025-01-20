import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { ZodError } from "zod";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          if(!credentials) {
            throw new Error("Missing credentials");
          }
          const {username,password} = credentials;
  
          if(!username || !password) {
            throw new Error("Missing identifier or password");
          }
          // if(!credentials)  throw new Error("credentials.")
          // logic to verify if the user exists
          const user = await prisma.user.findFirst({
            where: {id: username}
          });
          console.log(user,"asdas");

          
          
          if(!user) {
            throw new Error("User not found.");
          }
          
          const compare = await bcrypt.compare(password as string, user.password as string); 
  
          if (!compare) {
            throw new Error("Invalid credentials.");
          }
   
   
          // return user object with their profile data
          return {
            id: user.id
          };
        } catch (error:any) {
          console.log(error.message);
          if (error instanceof ZodError) {
            
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
        
      },
    }),
    
  ],
  pages: {
    signIn: "/auth/signin",
  },
  debug:true,
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async session({ session, token, user }) {
      // Attach the user information to the session
      session.user.id = token.id as string;
      console.log("Session Callback:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
})