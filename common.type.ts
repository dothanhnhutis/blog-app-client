import { User, Session } from "next-auth";
import { z } from "zod";

export type SiderBarActionType =
  | {
      type: "default";
      data: {
        icon: JSX.Element;
        name: string;
        path: string;
      };
    }
  | {
      type: "number";
      data: {
        icon: JSX.Element;
        name: string;
        path: string;
        count: number;
      };
    }
  | {
      type: "list";
      data: {
        icon: JSX.Element;
        name: string;
        list: {
          path: string;
          name: string;
        }[];
      };
    };

export type LoginSubmit = {
  email: string;
  password: string;
};

export type RegisterSubmit = LoginSubmit & {
  otp: string;
};

export type NavBarLink = {
  link: string;
  name: string;
  sublinks?: SubLink[];
};

export type SubLink = {
  link: string;
  name: string;
};

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  password?: string;
  updatedAt: string;
  createdAt: string;
};

// export type OTPSearch = {
//   id: string;
//   code: string;
//   type: string;
//   verified: boolean;
//   email: string;
//   expireAt: string;
//   updatedAt: string;
//   createdAt: string;
// };

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    email: string;
    role: "ADMIN" | "POSTER" | "SUBSCRIBER";
    name: string;
    avatarUrl: string;
    token: string;
    expires: string;
  };
}

export const permissionEnum = [
  "USER_VIEW",
  "USER_CREATE",
  "USER_EDIT",
  "USER_DELETE",
  "ROLE_VIEW",
  "ROLE_CREATE",
  "ROLE_EDIT",
  "ROLE_DELETE",
  "TAG_VIEW",
  "TAG_CREATE",
  "TAG_EDIT",
  "TAG_DELETE",
  "POST_VIEW",
  "POST_CREATE",
  "POST_EDIT",
  "POST_DELETE",
] as const;
const permissionZod = z.enum(permissionEnum);
export type Permission = z.infer<typeof permissionZod>;
export type AuthRes = {
  id: string;
  email: string;
  username: string;
  avatarUrl: null | string;
  role: {
    id: string;
    roleName: string;
    permissions: Permission[];
  };
  isActive: boolean;
  token: string;
};

export type TagRes = {
  id: string;
  tagName: string;
  slug: string;
  _count: {
    post: number;
  };
};

export type UserRes = Omit<AuthRes, "token"> & {
  bio: string;
  phone: string;
  avatarUrl: string;
  address: string;
};

export type EditUserInput = Omit<UserRes, "role" | "id"> & {
  roleId: string;
};
