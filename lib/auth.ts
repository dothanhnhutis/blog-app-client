import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { AuthRes, SessionInterface, UserRes } from "@/common.type";
import { SigninInput } from "@/constants/schema";
import { http, httpExternal } from "./http";
import { signJWT } from "./jwt";

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
          const { data } = await http.post<{ token: string }>(
            "/signin/provider",
            {
              token,
            }
          );
          return {
            ...profile,
            ...data,
            id: profile.sub,
          };
        } catch (error) {
          return {
            ...profile,
            id: profile.sub,
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
          const { email, password } = credentials as SigninInput;
          const { data } = await http.post<AuthRes>("/signin", {
            email,
            password,
          });
          return {
            id: "null",
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
      return token?.token!;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user }) {
      const { data } = await httpExternal.get<UserRes>(`/users/me`, {
        headers: {
          "x-token": user.token,
        },
      });
      return data.isActive ?? false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token, user }) {
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
  console.log(session);
  return session;
}
