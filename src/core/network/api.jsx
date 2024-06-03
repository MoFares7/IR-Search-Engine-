import axios from 'axios';

const BASE_URL = 'https://3654-188-133-15-178.ngrok-free.app';

const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
                'Content-Type': 'application/json',
        },
});

axiosInstance.interceptors.request.use(
        (config) => {
                if (config.data instanceof FormData) {
                        config.headers['Content-Type'] = 'multipart/form-data';
                }
                return config;
        },
        (error) => {
                return Promise.reject(error);
        }
);

export default axiosInstance;
