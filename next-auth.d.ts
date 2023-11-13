import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { AuthRes, UserRes } from "./common.type";
declare module "next-auth" {
  interface Session {
    user: AuthRes & DefaultSession;
  }
  interface User extends DefaultUser, AuthRes {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, AuthRes {}
}
