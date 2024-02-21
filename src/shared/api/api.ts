import axios from 'axios';
import { AuthResponse } from '../types/authResponse';

export const API_URL = 'http://localhost:5000/api';

export const $api = axios.create({
  baseURL: API_URL,
  /**
   * для того, чтобы к каждому запросу куки цеплялись автоматически
   */
  withCredentials: true,
});

/**
 * вешаем интерцептор перехватывающий запросб
 * он будет добавлять нужный хэдэр в каждый запрос
 */

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    throw error;
  },
);

export default $api;
