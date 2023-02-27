import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL: "https://api.currencyapi.com/v3/",
  });

  return api;
}
export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}

export default useApi;
