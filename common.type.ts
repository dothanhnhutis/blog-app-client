import { User, Session } from "next-auth";

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

export type OTPSearch = {
  id: string;
  code: string;
  type: string;
  verified: boolean;
  email: string;
  expireAt: string;
  updatedAt: string;
  createdAt: string;
};

// export interface SessionInterface extends Session {
//   user: User & {
//     id: string;
//     email: string;
//     role: string;
//     name: string;
//     image: string;
//     status: string;
//     token: string;
//   };
// }

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;
