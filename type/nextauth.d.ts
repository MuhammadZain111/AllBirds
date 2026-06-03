import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: number;
    id?: string;
    isVerfied?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }

  interface Session {
    user: {
      role: number;
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      role: number;
      id_?: string;
      isverified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      image?: string | null;
    } & DefaultSession["user"];
  }
}
