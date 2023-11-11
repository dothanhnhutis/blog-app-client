import axios, { AxiosError, AxiosInstance } from "axios";
import https from "https";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000/api";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/api";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: CLIENT_URL,
      timeout: 10000,
      headers: {
        Accept: "application/json",
      },
    });
  }
}

export const http = new Http().instance;

export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});
class HttpExternal {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: SERVER_URL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        Accept: "application/json",
      },
      httpsAgent: agent,
    });
  }
}

export const httpExternal = new HttpExternal().instance;
