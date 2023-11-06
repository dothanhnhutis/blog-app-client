import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcryptjs from "bcryptjs";
import slugify from "slugify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (name: string) => {
  return slugify(name, { lower: true, locale: "vi" });
};

export const hashPassword = (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const comparePassword = (
  hashPassowrd: string,
  password: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashPassowrd).catch((e) => false);
};

export const generateOTPCode = () => {
  return Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
};
