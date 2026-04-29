import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DbConnect } from "@/lib/DbConnect";
import UserModel from "@/models/UserModel";
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"







export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await DbConnect();

        try {
          if (!credentials?.identifier || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });







          if (!user) {
            throw new Error("No user found");
          }

          const isVerified = user.isVerified ?? user.verified;

          if (!isVerified) {
            throw new Error("User is not verified");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),


    FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    authorization: {
        params: {
          scope: "email,public_profile", 
        },
      },
     }),
  
     GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  
  ],

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token._id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {

      if (session.user) {
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

