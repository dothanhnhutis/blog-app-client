import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { AuthRes } from "./common.type";
declare module "next-auth" {
  interface Session {
    user: AuthRes & DefaultSession;
  }
  interface User extends DefaultUser, Omit<AuthRes, "id"> {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, Omit<AuthRes, "id"> {}
}
