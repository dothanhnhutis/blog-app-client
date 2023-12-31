import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { AuthRes, CurrentUser, SessionInterface, UserRes } from "@/common.type";
import { SigninInput } from "@/constants/schema";
import { http, httpExternal } from "./http";
import { signJWT } from "./jwt";
import { useQuery } from "@tanstack/react-query";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile: GithubProfile) {
        const ErrorRes: User = {
          ...profile,
          id: profile.id.toString(),
          token: "",
          avatarUrl: profile.avatar_url,
          isActive: false,
          role: "Writer",
          username: profile.name!,
        };
        try {
          if (profile.email) {
            const payload = {
              email: profile.email,
              username: profile.name ?? profile.login,
              avatarUrl: profile.avatar_url,
            };
            const token = signJWT(payload, process.env.NEXTAUTH_SECRET!);
            const { data } = await http.post<AuthRes>("/signin/provider", {
              token,
            });
            return {
              ...profile,
              ...data,
            };
          }
          return ErrorRes;
        } catch (error) {
          return ErrorRes;
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
          const { data } = await http.post<AuthRes>("/signin/provider", {
            token,
          });
          return {
            ...profile,
            ...data,
          };
        } catch (error) {
          return {
            ...profile,
            id: profile.sub,
            token: "",
            avatarUrl: null,
            isActive: false,
            role: "Writer",
            username: profile.name,
          };
        }
      },
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as SigninInput;
          const { data } = await http.post<AuthRes>("/signin", {
            email,
            password,
          });
          return {
            ...data,
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
      return user.isActive;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getServerAuthSession() {
  const headers: { [index: string]: any } = {};
  const session = (await getServerSession(authOptions)) as SessionInterface;
  if (session) {
    headers["x-token"] = session.user.token;
  }
  const { data } = await httpExternal.get<CurrentUser>("/users/me", {
    headers,
  });
  return data;
}
