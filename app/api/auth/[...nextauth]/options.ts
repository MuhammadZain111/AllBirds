import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

// Add this check at the top of authOptions.ts temporarily
// console.log("SECRET loaded:", !!process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

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
            return null;
          }

          const isVerified = user.isVerified ?? user.verified;

          if (!isVerified) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("authorize error:", error);
          return null;
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
    async jwt({ token, user, account }) {
      // =========================
      // 1. FIRST LOGIN
      // =========================
      if (user) {
        const dbUser = await UserModel.findOne({ email: user.email });

        token._id = user.id?.toString();
        token.email = user.email;
        token.lastFetched = Date.now();
        token.role = dbUser.role;
        token.username = user.username;
        token.image = dbUser.image;

        // Google image (ONLY FIRST LOGIN)
        if (account?.provider === "google") {
          token.image = (user as any).image || null;
        }
      }

      // =======2.DB REFRESH

      const shouldRefreshFromDB =
        !token.lastFetched ||
        Date.now() - Number(token.lastFetched) > 60 * 1000;

      if (token.email && shouldRefreshFromDB) {
        try {
          await dbConnect();

          const dbUser = await UserModel.findOne({ email: token.email });

          if (dbUser) {
            token._id = dbUser._id.toString();
            token.email = dbUser.email;
            token.username = dbUser.username;
            token.role = dbUser.role ?? 3;
            token.image = dbUser.image || token.image || null;
          }
        } catch (err) {
          console.error("JWT DB fetch error:", err);
        } finally {
          token.lastFetched = Date.now();
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log(
        "SESSION fired | token._id:",
        token._id,
        "| token.email:",
        token.email,
      );

      if (session.user) {
        session.user._id = (token._id as string) ?? "";
        session.user.email = (token.email as string) ?? "";
        session.user.username = (token.username as string) ?? "";
        session.user.role = (token.role as number) ?? 0;
        session.user.image = (token.image as string) || "/icons/user.png";
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
