import { User, Session } from "next-auth";
import { z } from "zod";
import { Role } from "./constants/schema";

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
    role: Role;
    name: string;
    avatarUrl: string;
    token: string;
    expires: string;
  };
}

export type CurrentUser = {
  id: string;
  email: string;
  role: Role;
  name: string;
  username: string;
  avatarUrl: string;
};

export type AuthRes = {
  id: string;
  email: string;
  username: string;
  avatarUrl: null | string;
  role: Role;
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
  address: string;
};

export type ImageRes = {
  id: string;
  public_id: string;
  width: number;
  height: number;
  tags: string[];
  url: string;
  userId: string;
  createAt: string;
};

export type UserCreateInput = {
  email: string;
  isActive: boolean;
  role: Role;
  username: string;
  password: string;
};
