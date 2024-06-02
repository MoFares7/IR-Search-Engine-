import axios from 'axios';

const BASE_URL = 'https://0fc4-46-53-79-145.ngrok-free.app';

const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
        },
});

// axiosInstance.interceptors.request.use(
        // (config) => {
        //         const token = getValue('token');
        //         if (token) {
        //                 config.headers['Authorization'] = `Bearer ${token}`;
        //         }
        //         return config;
        // },
        // (error) => {
        //         return Promise.reject(error);
        // }
// );

export default axiosInstance;
