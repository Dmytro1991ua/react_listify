import axios, { AxiosRequestConfig } from 'axios';

import { auth } from './firebase';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const AXIOS_CONFIG = axios.create({ baseURL: API_BASE_URL });

AXIOS_CONFIG.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());
    const axiosConfig = config;

    if (token) {
      axiosConfig.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
