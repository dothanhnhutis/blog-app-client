import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcryptjs from "bcryptjs";
import slugify from "slugify";
import { RGBColor } from "react-color";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64DataURL(value: string) {
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  return base64Regex.test(value);
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

export const compareObject = (obj1: object, obj2: object): boolean => {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
      return (
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        obj1[key] === obj2[key]
      );
    })
  );
};

export const convertHexToRGBA = (hexCode: string, a = 1): RGBColor => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (a > 1 && a <= 100) {
    a = a / 100;
  }

  return {
    r,
    g,
    b,
    a,
  };
};
