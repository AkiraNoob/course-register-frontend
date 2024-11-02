import getAccessToken from "@/helpers/cookies/getAccessToken";
import axios, { AxiosRequestConfig } from "axios";

const baseApi = process.env.DOCCEN_API_URL
  ? `${import.meta.env.VITE_API_URL}`
  : "http://localhost:3000";

const requestConfig: AxiosRequestConfig = {
  baseURL: baseApi,
  //https://stackoverflow.com/questions/63064393/getting-axios-error-connect-etimedout-when-making-high-volume-of-calls
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
