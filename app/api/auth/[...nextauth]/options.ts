import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

// Add this check at the top of authOptions.ts temporarily
// console.log("SECRET loaded:", !!process.env.NEXTAUTH_SECRET);

const authOptions: NextAuthOptions = {
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
      // console.log(
      //   "JWT fired | user:",
      //   !!user,
      //   "| email:",
      //   token.email,
      //   "| lastFetched:",
      //   token.lastFetched,
      // );

      // First login — seed token from user
      if (user) {
        token._id = user.id?.toString();
        token.email = user.email;
      }

      const shouldRefreshFromDB =
        !token.lastFetched ||
        Date.now() - (token.lastFetched as number) > 60 * 1000;

      if (token.email && shouldRefreshFromDB) {
        try {
          await dbConnect();
          const dbUser = await UserModel.findOne({ email: token.email });
          console.log(" DB user found:", !!dbUser);

          if (dbUser) {
            token._id = dbUser._id.toString();
            token.email = dbUser.email;
            token.username = dbUser.username;
            token.role = dbUser.role;
          }
        } catch (err) {
          console.error("JWT DB fetch error:", err);
          //  Don't crash — keep existing token data
        } finally {
          //  CRITICAL: always update lastFetched so we don't
          // hammer DB on every request when DB is down
          token.lastFetched = Date.now();
        }
      }

      return token;
    },


    // This is the Code fro gooogle loi saving the User 

    async signIn({ user, account }) {
  try {
    if (!user?.email) return false;

    await dbConnect();

    const existingUser = await UserModel.findOne({
      email: user.email,
    });

    if (!existingUser) {
      await UserModel.create({
        email: user.email,
        username: user.name || user.email.split("@")[0],
        image: user.image,
        role: "user",
        provider: account?.provider,
        isVerified: true,
      });
    }

    return true;
  } catch (err) {
    console.error("OAuth signIn error:", err);
    return true;
  }
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
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
