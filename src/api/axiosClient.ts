import axios, { AxiosError } from "axios";

import { baseURL } from "@/constants";

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...config.headers,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
