import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { AuthRes } from "./common.type";
declare module "next-auth" {
  interface Session {
    user: {
      token: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token: string;
  }
}
