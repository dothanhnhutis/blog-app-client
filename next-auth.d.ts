import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      status: "ACTIVE" | "BLOCK";
      role: "ADMIN" | "POSTER" | "SUBSCRIBER";
      avatarUrl: string | null | undefined;
      token: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    avatarUrl: string | null | undefined;
    username: string;
    status: "ACTIVE" | "BLOCK";
    role: "ADMIN" | "POSTER" | "SUBSCRIBER";
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    status: "ACTIVE" | "BLOCK";
    role: "ADMIN" | "POSTER" | "SUBSCRIBER";
    avatarUrl: string | null | undefined;
    username: string;
    token: string;
  }
}
