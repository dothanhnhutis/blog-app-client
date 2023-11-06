import axios, { AxiosError, AxiosInstance } from "axios";
const SERVER_URL = process.env.SERVER_URL || "";
class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000/api",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export const http = new Http().instance;
export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};
