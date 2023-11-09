import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { SessionInterface } from "@/common.type";
import { SigninFormType } from "@/constants/schema";
import { http, httpExternal } from "./http";
import { signJWT } from "./jwt";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile: GithubProfile) {
        try {
          const payload = {
            email: profile.email,
            username: profile.name ?? profile.login,
            avatarUrl: profile.avatar_url,
          };
          const token = signJWT(payload, process.env.NEXTAUTH_SECRET!);
          const { data } = await http.post<{
            id: string;
            email: string;
            username: string;
            avatarUrl?: string | null;
            role: "ADMIN" | "POSTER" | "SUBSCRIBER";
            status: "ACTIVE" | "BLOCK";
            token: string;
          }>("/signin/provider", { token });
          return {
            ...profile,
            email: data.email,
            role: data.role,
            status: data.status,
            id: data.id,
            username: data.username,
            avatarUrl: data.avatarUrl,
            token: data.token,
          };
        } catch (error) {
          return {
            ...profile,
            email: profile.email,
            role: "SUBSCRIBER",
            status: "BLOCK",
            id: profile.id.toString(),
            username: profile.name ?? "",
            avatarUrl: profile.avatar_url,
            token: "",
          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile: GoogleProfile) {
        try {
          const payload = {
            email: profile.email,
            username: profile.name,
            avatarUrl: profile.picture,
          };
          const token = signJWT(payload, process.env.NEXTAUTH_SECRET!);
          const { data } = await http.post<{
            id: string;
            email: string;
            username: string;
            avatarUrl?: string | null;
            role: "ADMIN" | "POSTER" | "SUBSCRIBER";
            status: "ACTIVE" | "BLOCK";
            token: string;
          }>("/signin/provider", { token });
          return {
            ...profile,
            email: data.email,
            role: data.role,
            status: data.status,
            id: data.id,
            username: data.username,
            avatarUrl: data.avatarUrl,
            token: data.token,
          };
        } catch (error) {
          return {
            ...profile,
            email: profile.email,
            role: "SUBSCRIBER",
            status: "BLOCK",
            id: profile.sub,
            username: profile.name,
            avatarUrl: profile.picture,
            token: "",
          };
        }
      },
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as SigninFormType;
          const { data } = await http.post<{
            id: string;
            email: string;
            username: string;
            avatarUrl?: string | null;
            role: "ADMIN" | "POSTER" | "SUBSCRIBER";
            status: "ACTIVE" | "BLOCK";
            token: string;
          }>("/signin", { email, password });
          return {
            email: data.email,
            role: data.role,
            status: data.status,
            id: data.id,
            username: data.username,
            avatarUrl: data.avatarUrl,
            token: data.token,
          };
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user }) {
      return user.status === "ACTIVE";
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.avatarUrl = user.avatarUrl;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.avatarUrl = token.avatarUrl;
        session.user.token = token.token;
        httpExternal.defaults.headers.common.Authorization = `Bearer ${token.token}`;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getServerAuthSession() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
