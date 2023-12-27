import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';
export const $api = axios.create({
    baseURL: baseUrl,
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
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'token',
        )}`;
    }
    return config;
});

export default $api;
